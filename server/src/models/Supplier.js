const pool = require("../db");

const createSupplierTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await pool.query(queryText);
};

module.exports = {
	createSupplierTable,
};
