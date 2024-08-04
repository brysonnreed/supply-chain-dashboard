const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: true,
	},
});

pool.on("connect", () => {
	console.log("Connected to PostegreSQL");
});

module.exports = pool;
