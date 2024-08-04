const pool = require("../db");

const createOrderTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    customer_id INTEGER REFERENCES customers(id),
    shipment_id INTEGER REFERENCES shipments(id),
    quantity INTEGER NOT NULL, 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
    )`;
	await pool.query(queryText);
};

module.exports = {
	createOrderTable,
};
