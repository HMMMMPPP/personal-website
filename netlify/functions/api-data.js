// functions/api-data.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'); // Ensure newlines are correct

/**
 * Fetches and parses data from the Google Sheet.
 * This is a helper function, not the main Netlify handler.
 */
async function getSheetData() {
    try {
        if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            throw new Error("Missing Google Sheet credentials in environment variables.");
        }

        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        // --- Read from the 'ContactUs' sheet ---
        const contactusSheet = doc.sheetsByTitle['ContactUs'];
        const contactusRows = await contactusSheet.getRows();
        const contactusData = contactusRows.map(row => ({
            name: row.get('name') || '',
            email: row.get('email') || '',
            message: row.get('message') || '',
        }));

        // --- Read from the 'Logbook' sheet ---
        const logbookSheet = doc.sheetsByTitle['Logbook'];
        const logbookRows = await logbookSheet.getRows();
        const logbookData = logbookRows.map(row => ({
            amount: parseFloat(row.get('amount')) || 0,
            entry: row.get('entry') || '',
        }));

        // --- Read from the 'Suggestion' sheet ---
        const suggestionSheet = doc.sheetsByTitle['Suggestion'];
        const suggestionRows = await suggestionSheet.getRows();
        const suggestionsData = suggestionRows.map(row => ({
            name: row.get('name') || '',
            suggestion: row.get('suggestion') || '',
        }));

        // --- Read from the 'TopTier' sheet ---
        const topTierSheet = doc.sheetsByTitle['TopTier'];
        const topTierRows = await topTierSheet.getRows();
        const allSupportersData = topTierRows.map(row => ({
            name: row.get('Username') || 'Anonymous',
            amount: parseFloat(row.get('Donated')) || 0,
            message: row.get('Message') || '',
        }));

        return { logbookData, allSupportersData, suggestionsData, contactusData };

    } catch (error) {
        console.error('Error accessing Google Sheet:', error.message);
        if (error.message.includes("No sheet with title")) {
            throw new Error("CRITICAL: Make sure your sheet tabs are named 'Logbook', 'Suggestion', 'TopTier', and 'ContactUs' exactly.");
        }
        throw new Error('Failed to fetch data from Google Sheet.');
    }
}

// Netlify Function Handler
exports.handler = async (event, context) => {
    if (event.httpMethod !== 'GET') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        const { logbookData, suggestionsData, allSupportersData } = await getSheetData();

        const sortedContributors = [...allSupportersData]
            .sort((a, b) => b.amount - a.amount);

        const top5Contributors = sortedContributors.slice(0, 5);
        const remainingContributors = sortedContributors.slice(5);

        const missionData = {
            goal: 1000000,
            parts: [
                { id: 'cockpit', name: 'Cockpit & Avionics', cost: 100000 },
                { id: 'fuselage', name: 'Fuselage & Structure', cost: 250000 },
                { id: 'wings', name: 'Wing Assembly', cost: 500000 },
                { id: 'engines', name: 'Propulsion Systems', cost: 750000 },
                { id: 'tail', name: 'Control Surfaces', cost: 1000000 },
            ],
            logbook: logbookData,
            suggestions: suggestionsData,
            topContributors: top5Contributors,
            remainingContributors: remainingContributors,
        };

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // IMPORTANT: For CORS if your frontend is on a different domain
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(missionData),
        };

    } catch (error) {
        console.error('Netlify Function Error (/api/data):', error); // Log full error object for debugging
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // IMPORTANT: For CORS
            },
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};