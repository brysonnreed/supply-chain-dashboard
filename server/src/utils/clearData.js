const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const clearData = async () => {
	try {
		await pool.query("TRUNCATE TABLE customers RESTART IDENTITY CASCADE");
		await pool.query("TRUNCATE TABLE suppliers RESTART IDENTITY CASCADE");
		await pool.query("TRUNCATE TABLE products RESTART IDENTITY CASCADE");
		await pool.query("TRUNCATE TABLE inventory RESTART IDENTITY CASCADE");
		await pool.query("TRUNCATE TABLE orders RESTART IDENTITY CASCADE");
		await pool.query("TRUNCATE TABLE shipments RESTART IDENTITY CASCADE");
		console.log("All tables truncated successfully.");
	} catch (err) {
		console.error("Error truncating tables:", err);
	} finally {
		pool.end();
	}
};

clearData();
