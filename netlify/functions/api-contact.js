// functions/api-contact.js
const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// Retrieve these from Netlify Environment Variables
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_SERVICE_ACCOUNT_EMAIL = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n');

/**
 * Helper function to get ContactUs data.
 * Extracted from the original getSheetData but specific to ContactUs
 */
async function getContactUsData() {
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

    const contactusSheet = doc.sheetsByTitle['ContactUs'];
    if (!contactusSheet) {
        throw new Error("Sheet 'ContactUs' not found.");
    }
    const contactusRows = await contactusSheet.getRows();
    return contactusRows.map(row => ({
        name: row.get('name') || '',
        email: row.get('email') || '',
        message: row.get('message') || '',
        timestamp: row.get('timestamp') || '', // Assuming you'll add this column
    }));
}

exports.handler = async (event, context) => {
    // Set CORS headers for all responses
    const headers = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Allow requests from any origin
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
    };

    // Handle preflight OPTIONS request
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 200,
            headers: headers,
            body: '',
        };
    }

    try {
        if (!GOOGLE_SHEET_ID || !GOOGLE_SERVICE_ACCOUNT_EMAIL || !GOOGLE_PRIVATE_KEY) {
            throw new Error("Missing Google Sheet credentials in environment variables.");
        }

        if (event.httpMethod === 'POST') {
            const { name, email, message } = JSON.parse(event.body);

            if (!name || !email || !message) {
                return {
                    statusCode: 400,
                    headers: headers,
                    body: JSON.stringify({ error: 'Name, email, and message are required.' })
                };
            }

            const serviceAccountAuth = new JWT({
                email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
                key: GOOGLE_PRIVATE_KEY,
                scopes: ['https://www.googleapis.com/auth/spreadsheets'],
            });

            const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
            await doc.loadInfo();

            const contactSheet = doc.sheetsByTitle['ContactUs'];
            if (!contactSheet) {
                throw new Error("Sheet 'ContactUs' not found.");
            }

            const newRow = await contactSheet.addRow({
                name: name,
                email: email,
                message: message,
                timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" })
            });

            console.log(`Successfully added to ContactUs: ${name}`);

            return {
                statusCode: 201,
                headers: headers,
                body: JSON.stringify({
                    success: true,
                    message: 'Message logged successfully.',
                    data: {
                        name: newRow.get('name'),
                        email: newRow.get('email'),
                        message: newRow.get('message'),
                    },
                }),
            };
        } else if (event.httpMethod === 'GET') {
            const contactusData = await getContactUsData();
            return {
                statusCode: 200,
                headers: headers,
                body: JSON.stringify(contactusData),
            };
        } else {
            return { statusCode: 405, headers: headers, body: 'Method Not Allowed' };
        }

    } catch (error) {
        console.error(`Netlify Function Error (/api/contact - ${event.httpMethod}):`, error);
        return {
            statusCode: 500,
            headers: headers,
            body: JSON.stringify({ error: error.message || 'Internal Server Error' }),
        };
    }
};