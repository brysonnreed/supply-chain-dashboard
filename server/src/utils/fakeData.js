const { faker } = require("@faker-js/faker");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const createFakeCustomers = async (count = 40) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const name = faker.name.fullName();
			const email = faker.internet.email();
			const address = faker.address.streetAddress();
			const phone_number = faker.phone.number("##########");
			const created_at = faker.date.past(1);

			await client.query(
				`INSERT INTO customers (name, email, address, phone_number, created_at) VALUES ($1, $2, $3, $4, $5)`,
				[name, email, address, phone_number, created_at]
			);
		}
		console.log(`Inserted ${count} fake customers!`);
	} catch (err) {
		console.error("Error inserting fake customers:", err);
	} finally {
		client.release();
	}
};

const createFakeSuppliers = async (count = 40) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const name = faker.company.name();
			const contact_info = faker.phone.number("##########");
			const created_at = faker.date.past(1);

			await client.query(
				`INSERT INTO suppliers (name, contact_info, created_at) VALUES ($1, $2, $3)`,
				[name, contact_info, created_at]
			);
		}
		console.log(`Inserted ${count} fake suppliers!`);
	} catch (err) {
		console.error("Error inserting fake suppliers:", err);
	} finally {
		client.release();
	}
};

const createFakeProducts = async (count = 40) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const name = faker.commerce.productName();
			const description = faker.commerce.productDescription();
			const price = faker.commerce.price();
			const stock_quantity = faker.datatype.number({ min: 1, max: 200 });
			const created_at = faker.date.past(1);

			await client.query(
				`INSERT INTO products (name, description, price, stock_quantity, created_at) VALUES ($1, $2, $3, $4, $5)`,
				[name, description, price, stock_quantity, created_at]
			);
		}
		console.log(`Inserted ${count} fake products!`);
	} catch (err) {
		console.error("Error inserting fake products:", err);
	} finally {
		client.release();
	}
};

const createFakeInventory = async (count = 40) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const product_id = faker.datatype.number({ min: 1, max: 40 });
			const supplier_id = faker.datatype.number({ min: 1, max: 40 });
			const quantity = faker.datatype.number({ min: 1, max: 100 });
			const location = faker.address.city();
			const updated_at = faker.date.past(1);

			await client.query(
				`INSERT INTO inventory (product_id, supplier_id, quantity, location, updated_at) VALUES ($1, $2, $3, $4, $5)`,
				[product_id, supplier_id, quantity, location, updated_at]
			);
		}
		console.log(`Inserted ${count} fake inventory records!`);
	} catch (err) {
		console.error("Error inserting fake inventory:", err);
	} finally {
		client.release();
	}
};

const createFakeOrders = async (count = 40) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const product_id = faker.datatype.number({ min: 1, max: 40 });
			const customer_id = faker.datatype.number({ min: 1, max: 40 });
			const shipment_id = null; // Placeholder until shipment is created
			const quantity = faker.datatype.number({ min: 1, max: 10 });
			const status = faker.helpers.arrayElement(["pending", "shipped", "delivered"]);
			const order_date = faker.date.recent({ days: 30 });

			await client.query(
				`INSERT INTO orders (product_id, customer_id, shipment_id, quantity, status, order_date) VALUES ($1, $2, $3, $4, $5, $6)`,
				[product_id, customer_id, shipment_id, quantity, status, order_date]
			);
		}
		console.log(`Inserted ${count} fake orders!`);
	} catch (err) {
		console.error("Error inserting fake orders:", err);
	} finally {
		client.release();
	}
};

const createFakeShipments = async (count = 40) => {
	const client = await pool.connect();
	try {
		// Fetch existing order IDs and their associated product IDs
		let orderIdsResult = await client.query(
			"SELECT id, product_id FROM orders WHERE shipment_id IS NULL"
		);
		let orders = orderIdsResult.rows;

		if (orders.length === 0) {
			console.log("No orders to update with shipments.");
			return;
		}

		for (let i = 0; i < count; i++) {
			if (orders.length === 0) {
				console.log("All orders have been processed.");
				break;
			}

			// Select a random order
			const order = faker.helpers.arrayElement(orders);
			const order_id = order.id;
			const product_id = order.product_id; // Fetch the associated product_id from the order
			const quantity = faker.datatype.number({ min: 1, max: 50 });
			const shipment_date = faker.date.recent({ days: 30 });
			const estimated_arrival = faker.date.soon({ days: 30 });
			const status = faker.helpers.arrayElement(["in transit", "delivered", "pending"]);
			const destination = faker.address.city();
			const created_at = faker.date.recent({ days: 30 });

			// Insert shipment record with the retrieved product_id
			const shipmentResult = await client.query(
				`INSERT INTO shipments (product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination, created_At) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING id`,
				[
					product_id,
					order_id,
					quantity,
					shipment_date,
					estimated_arrival,
					status,
					destination,
					created_at,
				]
			);
			const shipment_id = shipmentResult.rows[0].id;

			// Update the order with the new shipment ID
			await client.query(`UPDATE orders SET shipment_id = $1 WHERE id = $2`, [
				shipment_id,
				order_id,
			]);

			// Remove the processed order from the list to avoid reprocessing
			orders = orders.filter((o) => o.id !== order_id);
		}
		console.log(`Inserted ${count} fake shipments and updated corresponding orders!`);
	} catch (err) {
		console.error("Error inserting fake shipments:", err);
	} finally {
		client.release();
	}
};

(async () => {
	await createFakeCustomers();
	await createFakeSuppliers();
	await createFakeProducts();
	await createFakeInventory();
	await createFakeOrders();
	await createFakeShipments();
})();
