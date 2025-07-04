const { GoogleSpreadsheet } = require('google-spreadsheet');
const { JWT } = require('google-auth-library');

// --- CONFIGURATION ---
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID; // Use environment variables
const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;

/**
 * Fetches and parses data from the Google Sheet.
 */
async function getSheetData() {
  try {
    const serviceAccountAuth = new JWT({
      email: GOOGLE_CLIENT_EMAIL,
      key: GOOGLE_PRIVATE_KEY.replace(/\\n/g, '\n'), // Important for multiline key
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const doc = new GoogleSpreadsheet(GOOGLE_SHEET_ID, serviceAccountAuth);
    await doc.loadInfo();

    const contactusSheet = doc.sheetsByTitle['ContactUs'];
    const contactusRows = await contactusSheet.getRows();
    const contactusData = contactusRows.map(row => ({
      name: row.get('name') || '',
      email: row.get('email') || '',
      message: row.get('message') || '',
    }));

    const logbookSheet = doc.sheetsByTitle['Logbook'];
    const logbookRows = await logbookSheet.getRows();
    const logbookData = logbookRows.map(row => ({
      amount: parseFloat(row.get('amount')) || 0,
      entry: row.get('entry') || '',
    }));

    const suggestionSheet = doc.sheetsByTitle['Suggestion'];
    const suggestionRows = await suggestionSheet.getRows();
    const suggestionsData = suggestionRows.map(row => ({
      name: row.get('name') || '',
      suggestion: row.get('suggestion') || '',
    }));

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

// Netlify Function handler
exports.handler = async (event, context) => {
  console.log(`[${new Date().toLocaleTimeString()}] Received request for /api/data`);

  // Only allow GET requests for this endpoint
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
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

    console.log(`[${new Date().toLocaleTimeString()}] Successfully sent mission data.`);
    return {
      statusCode: 200,
      body: JSON.stringify(missionData),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Or your specific frontend domain
      },
    };

  } catch (error) {
    console.error('API Error:', error.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    };
  }
};