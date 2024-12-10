const Pool = require('pg').Pool;
require('dotenv').config();

/*
const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: "localhost",
    port: 5432
});
*/

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});


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

const createPostTblQuery = 'CREATE TABLE IF NOT EXISTS "posttable" ("id" SERIAL PRIMARY KEY, "title" VARCHAR(200) NOT NULL, "body" VARCHAR(200) NOT NULL, "urllink" varchar(200));';

const createUserTblQuery = 'CREATE TABLE IF NOT EXISTS "users" ("id" uuid PRIMARY KEY, "username" VARCHAR(200) NOT NULL, "password" VARCHAR(200) NOT NULL);';


execute(createPostTblQuery).then((res) => {
    if (res) {
        console.log("Posts table created successfully");
    } else {
        console.log("Posts table creation failed");
    }
});

execute(createUserTblQuery).then((res) => {
    if (res) {
        console.log("Users table created successfully");
    } else {
        console.log("Users table creation failed");
    }
});

module.exports = { pool };
