const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// --- CONFIGURATION ---
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

exports.handler = async (event, context) => {
  console.log(`[${new Date().toLocaleTimeString()}] Received POST request for /api/suggestions`);

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  }

  let body;
  try {
    body = JSON.parse(event.body);
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid JSON body.' }),
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  }

  const { name, suggestion } = body;

  if (!name || !suggestion) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Name and suggestion are required.' }),
      headers: { 'Access-Control-Allow-Origin': '*' },
    };
  }

  try {
    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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

    console.log(`[${new Date().toLocaleTimeString()}] Successfully added to suggestion: ${name}`);

    return {
      statusCode: 201,
      body: JSON.stringify({
        success: true,
        message: 'Suggestion logged.',
        data: {
          name: newRow.get('name'),
          suggestion: newRow.get('suggestion')
        }
      }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };

  } catch (error) {
    console.error('API Error on POST /api/suggestions:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to write to Google Sheet.' }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};