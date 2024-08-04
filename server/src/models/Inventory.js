const pool = require("../db");

const createInventoryTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS inventory (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    supplier_id INTEGER REFERENCES suppliers(id),
    quantity INTEGER NOT NULL,
    location VARCHAR(100),
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await pool.query(queryText);
};

module.exports = {
	createInventoryTable,
};
