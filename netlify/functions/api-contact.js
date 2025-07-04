const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// --- CONFIGURATION ---
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

// Helper to get contact data (can be reused)
async function getContactUsData() {
  const serviceAccountAuth = new JWT({
    email: GOOGLE_CLIENT_EMAIL,
    key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'),
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
    timestamp: row.get('timestamp') || '', // Include timestamp if you add it
  }));
}

exports.handler = async (event, context) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*', // IMPORTANT: Adjust for production
    'Access-Control-Allow-Headers': 'Content-Type', // Required for POST
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS', // Allow preflight for POST
  };

  // Handle preflight OPTIONS request for POST
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '', // No body needed for OPTIONS
    };
  }

  // --- Handle GET request ---
  if (event.httpMethod === 'GET') {
    console.log(`[${new Date().toLocaleTimeString()}] Received GET request for /api/contact`);
    try {
      const contactusData = await getContactUsData();
      console.log(`[${new Date().toLocaleTimeString()}] Successfully sent ContactUs data.`);
      return {
        statusCode: 200,
        body: JSON.stringify(contactusData),
        headers,
      };
    } catch (error) {
      console.error('API Error on GET /api/contact:', error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: error.message }),
        headers,
      };
    }
  }

  // --- Handle POST request ---
  if (event.httpMethod === 'POST') {
    console.log(`[${new Date().toLocaleTimeString()}] Received POST request for /api/contact`);
    let body;
    try {
      body = JSON.parse(event.body);
    } catch (e) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Invalid JSON body.' }),
        headers,
      };
    }

    const { name, email, message } = body;

    if (!name || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Name, email, and message are required.' }),
        headers,
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

      const contactSheet = doc.sheetsByTitle['ContactUs'];
      if (!contactSheet) {
        throw new Error("Sheet 'ContactUs' not found.");
      }

      const newRow = await contactSheet.addRow({
        name: name,
        email: email,
        message: message,
        timestamp: new Date().toLocaleString("en-US", { timeZone: "Asia/Manila" }) // Add timestamp column in your sheet!
      });

      console.log(`[${new Date().toLocaleTimeString()}] Successfully added to ContactUs: ${name}`);

      return {
        statusCode: 201,
        body: JSON.stringify({
          success: true,
          message: 'Message logged successfully.',
          data: {
            name: newRow.get('name'),
            email: newRow.get('email'),
            message: newRow.get('message'),
          },
        }),
        headers,
      };

    } catch (error) {
      console.error('API Error on POST /api/contact:', error.message);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to write message to Google Sheet.' }),
        headers,
      };
    }
  }

  // Fallback for unsupported methods
  return {
    statusCode: 405,
    body: JSON.stringify({ error: 'Method Not Allowed' }),
    headers,
  };
};