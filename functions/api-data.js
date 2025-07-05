// functions/api-data.js
const { Pool } = require('pg');

// IMPORTANT: This NEON_DATABASE_URL will be provided by Netlify's environment variables
// in production, and from your local .env file when using 'netlify dev'.
const NEON_DATABASE_URL = process.env.NETLIFY_DATABASE_URL;

// --- ADDED LOGGING FOR DEBUGGING NEON_DATABASE_URL ---
// Using the correct timezone for logging
const getManilaTime = () => new Date().toLocaleString('en-PH', {timeZone: 'Asia/Manila'});

console.log(`[${getManilaTime()}] --- Netlify Function Invoked: api-data ---`);
console.log(`[${getManilaTime()}] NEON_DATABASE_URL defined:`, !!NEON_DATABASE_URL); // Logs true if defined, false if undefined/null

if (!NEON_DATABASE_URL) {
    console.error(`[${getManilaTime()}] ERROR: NEON_DATABASE_URL is not set in environment variables!`);
    // Consider returning an early error here if you want to fail fast when the URL is missing
    // return {
    //     statusCode: 500,
    //     headers: { 'Access-Control-Allow-Origin': '*' },
    //     body: JSON.stringify({ error: 'Server configuration error: Database URL missing.' }),
    // };
}
// --- END ADDED LOGGING ---

// Initialize a connection pool. This should ideally be outside the handler
// so it can be reused across warm invocations of the function.
const pool = new Pool({
    connectionString: NEON_DATABASE_URL,
    ssl: {
        // For Netlify deployment, 'rejectUnauthorized: true' is the secure default
        // if your Neon connection string uses sslmode=require (which it should).
        // If you encounter SSL issues on deployment, you might temporarily set to false,
        // but investigate the root cause for production.
        rejectUnauthorized: true // Should be true for secure production
    }
});

exports.handler = async function(event, context) {
    // Only allow GET requests for this endpoint
    if (event.httpMethod !== 'GET') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Allow all origins for simplicity, tighten in production if needed
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        };
    }

    let client;
    try {
        console.log(`[${getManilaTime()}] Attempting to connect to DB...`);
        client = await pool.connect(); // Get a client from the pool
        console.log(`[${getManilaTime()}] Successfully connected to DB.`);

        // --- Read from the 'contact_messages' table ---
        const contactusRes = await client.query('SELECT name, email, message FROM contact_messages ORDER BY timestamp DESC');
        const contactusData = contactusRes.rows;
        console.log(`[${getManilaTime()}] Fetched ${contactusData.length} contact messages.`);


        // --- Read from the 'logbook_entries' table ---
        const logbookRes = await client.query('SELECT amount, entry FROM logbook_entries ORDER BY id ASC');
        const logbookData = logbookRes.rows.map(row => ({
            amount: parseFloat(row.amount), // Ensure amount is parsed as float
            entry: row.entry
        }));
        console.log(`[${getManilaTime()}] Fetched ${logbookData.length} logbook entries.`);


        // --- Read from the 'suggestions' table ---
        const suggestionRes = await client.query('SELECT name, suggestion FROM suggestions ORDER BY id DESC');
        const suggestionsData = suggestionRes.rows;
        console.log(`[${getManilaTime()}] Fetched ${suggestionsData.length} suggestions.`);


        // --- Read from the 'supporters' table ---
        const topTierRes = await client.query('SELECT username, donated_amount, message FROM supporters ORDER BY donated_amount DESC');
        const allSupportersData = topTierRes.rows.map(row => ({
            name: row.username || 'Anonymous', // Handle potential NULL username
            amount: parseFloat(row.donated_amount) || 0, // Handle potential NULL donated_amount
            message: row.message || '' // Handle potential NULL message
        }));
        console.log(`[${getManilaTime()}] Fetched ${allSupportersData.length} supporters.`);


        // Process and separate the supporter lists as per your original server.js logic
        const sortedContributors = [...allSupportersData].sort((a, b) => b.amount - a.amount);
        const top5Contributors = sortedContributors.slice(0, 5);
        const remainingContributors = sortedContributors.slice(5);

        // Construct the final missionData object
        const missionData = {
            goal: 1000000, // Static data from your server.js
            parts: [ // Static data from your server.js
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
            contactusData: contactusData // Including this as your getNeonData() also fetched it
        };

        console.log(`[${getManilaTime()}] Successfully prepared mission data.`);

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*', // Important for CORS
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify(missionData),
        };

    } catch (error) {
        // More detailed error logging
        console.error(`[${getManilaTime()}] API Error in /api/data function:`, error.message);
        console.error(`[${getManilaTime()}] Error stack:`, error.stack);

        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: `Failed to fetch data from Neon database: ${error.message}. Check function logs for details.` }),
        };
    } finally {
        if (client) {
            client.release(); // Release client back to the pool
        }
    }
};