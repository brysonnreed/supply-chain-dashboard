const { Client } = require("pg");
require("dotenv").config();

const client = new Client({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

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
	await client.query(queryText);
};

const createSupplierTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS suppliers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    contact_info TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await client.query(queryText);
};

const createProductTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    stock_quantity INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`;
	await client.query(queryText);
};

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
	await client.query(queryText);
};

const createOrderTable = async () => {
	const queryText = `
    CREATE TABLE IF NOT EXISTS orders (
    id SERIAL PRIMARY KEY,
    product_id INTEGER REFERENCES products(id),
    customer_id INTEGER REFERENCES customers(id),
    shipment_id INTEGER,
    quantity INTEGER NOT NULL, 
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) NOT NULL
    )`;
	await client.query(queryText);
};

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
	await client.query(queryText);
};

const addForeignKeys = async () => {
	const queryText = `ALTER TABLE orders ADD CONSTRAINT fk_shipment FOREIGN KEY (shipment_id) REFERENCES shipments(id)`;

	await client.query(queryText);
};

const initializeDatabase = async () => {
	try {
		await client.connect(); // Connect to the database

		await createCustomerTable();
		await createInventoryTable();
		await createOrderTable();
		await createProductTable();
		await createShipmentTable();
		await createSupplierTable();

		// Add foreign key constraints
		await addForeignKeys();

		console.log("Database initialized successfully!");
	} catch (err) {
		console.error("Database initialization failed: ", err);
	} finally {
		await client.end(); // Close the database connection
	}
};

initializeDatabase();
