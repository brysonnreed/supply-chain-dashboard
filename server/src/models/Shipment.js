const pool = require("../db");

const createShipmentTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS shipments (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    order_id INTEGER REFERENCES orders(id),
    quantity INTEGER NOT NULL,
    shipment_date TIMESTAMP,
    estimated_arrival TIMESTAMP,
    status VARCHAR(50),
    destination VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await pool.query(queryText);
};

module.exports = {
	createShipmentTable,
};
