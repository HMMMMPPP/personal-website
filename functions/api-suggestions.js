// functions/api-suggestions.js
const { Pool } = require('pg');

const NEON_DATABASE_URL = process.env.NEON_DATABASE_URL;

const pool = new Pool({
    connectionString: NEON_DATABASE_URL,
    ssl: { rejectUnauthorized: true }
});

exports.handler = async function(event, context) {
    // Handle CORS preflight requests
    if (event.httpMethod === 'OPTIONS') {
        return {
            statusCode: 204, // No Content
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: ''
        };
    }

    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            body: JSON.stringify({ error: 'Method Not Allowed' }),
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            }
        };
    }

    let client;
    try {
        const { name, suggestion } = JSON.parse(event.body);

        if (!name || !suggestion) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: '// AUTH.ERROR: Callsign and intel are required fields.' }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            };
        }

        client = await pool.connect();
        const queryText = 'INSERT INTO suggestions (name, suggestion) VALUES ($1, $2) RETURNING id, name, suggestion';
        const newRow = await client.query(queryText, [name, suggestion]);
        client.release();

        console.log(`[${new Date().toLocaleTimeString('en-PH', {timeZone: 'Asia/Manila'})}] Successfully added suggestion: ${name}`);

        return {
            statusCode: 201, // Created
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({
                success: true,
                message: 'Suggestion logged.',
                data: {
                    name: newRow.rows[0].name,
                    suggestion: newRow.rows[0].suggestion
                }
            }),
        };

    } catch (error) {
        console.error(`[${new Date().toLocaleTimeString('en-PH', {timeZone: 'Asia/Manila'})}] API Error in POST /api/suggestions function:`, error.message);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: `// UPLINK.ERROR: ${error.message}` }),
        };
    }
};