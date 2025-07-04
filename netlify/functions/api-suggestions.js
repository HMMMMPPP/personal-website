// functions/api-suggestions.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Retrieve these from Netlify Environment Variables
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { statusCode: 405, body: 'Method Not Allowed' };
    }

    try {
        if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            throw new Error("Missing Google Sheet credentials in environment variables.");
        }

        const { name, suggestion } = JSON.parse(event.body);

        if (!name || !suggestion) {
            return {
                statusCode: 400,
                headers: { 'Access-Control-Allow-Origin': '*' },
                body: JSON.stringify({ error: 'Name and suggestion are required.' })
            };
        }

        const serviceAccountAuth = new JWT({
            email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
            key: GOOGLE_PRIVATE_KEY,
            scopes: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
        await doc.loadInfo();

        const suggestionSheet = doc.sheetsByTitle['Suggestion'];
        if (!suggestionSheet) {
            throw new Error("Sheet 'Suggestion' not found.");
        }

        const newRow = await suggestionSheet.addRow({
            name: name,
            suggestion: suggestion,
        });

        console.log(`Successfully added to suggestion: ${name}`);

        return {
            statusCode: 201,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({
                success: true,
                message: 'suggestion logged.',
                data: {
                    name: newRow.get('name'),
                    suggestion: newRow.get('suggestion')
                }
            }),
        };

    } catch (error) {
        console.error('Netlify Function Error (/api/suggestions):', error);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({ error: error.message || 'Failed to write to Google Sheet.' }),
        };
    }
};