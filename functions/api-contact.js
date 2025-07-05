// functions/api-contact.js
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
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: ''
        };
    }

    let client;
    try {
        client = await pool.connect();

        if (event.httpMethod === 'POST') {
            const { name, email, message } = JSON.parse(event.body);

            if (!name || !email || !message) {
                return {
                    statusCode: 400,
                    body: JSON.stringify({ error: 'Name, email, and message are required.' }),
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'POST',
                        'Access-Control-Allow-Headers': 'Content-Type',
                    }
                };
            }

            const queryText = 'INSERT INTO contact_messages (name, email, message) VALUES ($1, $2, $3) RETURNING id, name, email, message, timestamp';
            const newRow = await client.query(queryText, [name, email, message]);
            client.release();

            console.log(`[${new Date().toLocaleTimeString('en-PH', {timeZone: 'Asia/Manila'})}] Successfully added contact message: ${name}`);

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
                    message: 'Message logged successfully.',
                    data: {
                        name: newRow.rows[0].name,
                        email: newRow.rows[0].email,
                        message: newRow.rows[0].message,
                    },
                }),
            };
        } else if (event.httpMethod === 'GET') {
            // Note: Your original getNeonData() was reused for contactusData
            // If this endpoint is truly only for ContactUs messages, fetch only those.
            const contactusRes = await client.query('SELECT name, email, message FROM contact_messages ORDER BY timestamp DESC');
            const contactusData = contactusRes.rows;
            client.release();

            console.log(`[${new Date().toLocaleTimeString('en-PH', {timeZone: 'Asia/Manila'})}] Successfully sent ContactUs data.`);

            return {
                statusCode: 200,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET',
                    'Access-Control-Allow-Headers': 'Content-Type',
                },
                body: JSON.stringify(contactusData),
            };
        } else {
            return {
                statusCode: 405,
                body: JSON.stringify({ error: 'Method Not Allowed' }),
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods': 'GET, POST',
                    'Access-Control-Allow-Headers': 'Content-Type',
                }
            };
        }
    } catch (error) {
        console.error(`[${new Date().toLocaleTimeString('en-PH', {timeZone: 'Asia/Manila'})}] API Error in /api/contact function (${event.httpMethod}):`, error.message);
        return {
            statusCode: 500,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST',
                'Access-Control-Allow-Headers': 'Content-Type',
            },
            body: JSON.stringify({ error: `Failed to process contact message: ${error.message}` }),
        };
    }
};