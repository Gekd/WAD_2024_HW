const Pool = require('pg').Pool;
require('dotenv').config();


// If you do not want to use Docker Compose, use the following code:
/* 
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    port: 5432
});

*/

// If you are using Docker Compose, use the following code:
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

const waitForDb = async () => {
    let retries = 5; // Number of retries
    while (retries > 0) {
        try {
            await pool.query('SELECT 1'); // Test the connection
            console.log('Database is ready');
            return;
        } catch (err) {
            console.log('Waiting for database to become ready...');
            retries -= 1;
            await new Promise(res => setTimeout(res, 1000)); // Wait for 1 second
        }
    }
    throw new Error('Unable to connect to database');
};

const execute = async (query) => {
    const client = await pool.connect();
    try {
        const result = await client.query(query);
        return result;
    } catch (error) {
        console.log(error.stack);
        throw error;
    } finally {
        client.release();
    }
};

const createPostTblQuery = 'CREATE TABLE IF NOT EXISTS "posttable" ("id" SERIAL PRIMARY KEY, "title" VARCHAR(200) NOT NULL, "body" VARCHAR(200) NOT NULL, "last_modified" TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP );';

const createUserTblQuery = 'CREATE TABLE IF NOT EXISTS "users" ("id" UUID PRIMARY KEY DEFAULT gen_random_uuid(), "email" VARCHAR(200) NOT NULL, "password" VARCHAR(200) NOT NULL);';

waitForDb()
    .then(() => Promise.all([
        execute(createPostTblQuery),
        execute(createUserTblQuery)
    ]))
    .then(() => {
        console.log('Tables created successfully');
    })
    .catch(err => {
        console.error('Error during DB setup:', err);
    });

module.exports = pool;
