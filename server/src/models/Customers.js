const pool = require("../db");

const createCustomerTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS customers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address TEXT,
    phone_number VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await pool.query(queryText);
};

module.exports = {
	createCustomerTable,
};
