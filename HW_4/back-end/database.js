const Pool = require('pg').Pool;
require('dotenv').config();

const pool = new Pool({
    user: "postgres",
    password: process.env.DB_PASSWORD,
    database: "hw4-db",
    host: "localhost",
    port: 5432
});
module.exports = pool;

const execute = async (query) => {
    try {
        await pool.connect();
        await pool.query(query);
        return true;
    } catch (error) {
        console.log(error.stack);
        return false;
    }
};

const createTblQuery = 'CREATE TABLE IF NOT EXISTS "posttable" ("id" SERIAL PRIMARY KEY, "title" VARCHAR(200) NOT NULL, "body" VARCHAR(200) NOT NULL, "urllink" varchar(200));';

execute(createTblQuery).then((res) => {
    if (res) {
        console.log("Table created successfully");
    } else {
        console.log("Table creation failed");
    }
});

module.exports = { pool, execute, createTblQuery };