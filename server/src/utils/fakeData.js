const { faker } = require("@faker-js/faker");
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
	connectionString: process.env.DATABASE_URL,
	ssl: {
		rejectUnauthorized: false,
	},
});

const createFakeCustomers = async (count = 20) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const name = faker.name.fullName();
			const email = faker.internet.email();
			const address = faker.address.streetAddress();
			const phone_number = faker.phone.number("##########");

			await client.query(
				`INSERT INTO customers (name, email, address, phone_number) VALUES ($1, $2, $3, $4)`,
				[name, email, address, phone_number]
			);
		}
		console.log(`Inserted ${count} fake customers!`);
	} catch (err) {
		console.error("Error inserting fake customers:", err);
	} finally {
		client.release();
	}
};

const createFakeSuppliers = async (count = 20) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const name = faker.company.name();
			const contact_info = faker.phone.number("##########");

			await client.query(`INSERT INTO suppliers (name, contact_info) VALUES ($1, $2)`, [
				name,
				contact_info,
			]);
		}
		console.log(`Inserted ${count} fake suppliers!`);
	} catch (err) {
		console.error("Error inserting fake suppliers:", err);
	} finally {
		client.release();
	}
};

const createFakeProducts = async (count = 20) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const name = faker.commerce.productName();
			const description = faker.commerce.productDescription();
			const price = faker.commerce.price();
			const stock_quantity = faker.datatype.number({ min: 1, max: 100 });

			await client.query(
				`INSERT INTO products (name, description, price, stock_quantity) VALUES ($1, $2, $3, $4)`,
				[name, description, price, stock_quantity]
			);
		}
		console.log(`Inserted ${count} fake products!`);
	} catch (err) {
		console.error("Error inserting fake products:", err);
	} finally {
		client.release();
	}
};

const createFakeInventory = async (count = 20) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const product_id = faker.datatype.number({ min: 1, max: 20 });
			const supplier_id = faker.datatype.number({ min: 1, max: 20 });
			const quantity = faker.datatype.number({ min: 1, max: 100 });
			const location = faker.address.city();

			await client.query(
				`INSERT INTO inventory (product_id, supplier_id, quantity, location) VALUES ($1, $2, $3, $4)`,
				[product_id, supplier_id, quantity, location]
			);
		}
		console.log(`Inserted ${count} fake inventory records!`);
	} catch (err) {
		console.error("Error inserting fake inventory:", err);
	} finally {
		client.release();
	}
};

const createFakeOrders = async (count = 20) => {
	const client = await pool.connect();
	try {
		for (let i = 0; i < count; i++) {
			const product_id = faker.datatype.number({ min: 1, max: 20 });
			const customer_id = faker.datatype.number({ min: 1, max: 20 });
			const shipment_id = null; // Placeholder until shipment is created
			const quantity = faker.datatype.number({ min: 1, max: 10 });
			const status = faker.helpers.arrayElement(["pending", "shipped", "delivered"]);

			await client.query(
				`INSERT INTO orders (product_id, customer_id, shipment_id, quantity, status) VALUES ($1, $2, $3, $4, $5)`,
				[product_id, customer_id, shipment_id, quantity, status]
			);
		}
		console.log(`Inserted ${count} fake orders!`);
	} catch (err) {
		console.error("Error inserting fake orders:", err);
	} finally {
		client.release();
	}
};

const createFakeShipments = async (count = 20) => {
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
			const quantity = faker.datatype.number({ min: 1, max: 10 });
			const shipment_date = faker.date.recent();
			const estimated_arrival = faker.date.soon();
			const status = faker.helpers.arrayElement(["in transit", "delivered", "pending"]);
			const destination = faker.address.city();

			// Insert shipment record with the retrieved product_id
			const shipmentResult = await client.query(
				`INSERT INTO shipments (product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING id`,
				[product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination]
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
