const pool = require("../db");

const getOrders = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM orders");
		res.status(200).json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getOrderById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query("SELECT * FROM orders WHERE id = $1", [id]);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows[0]);
		} else {
			res.status(404).json({ message: "Order not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createOrder = async (req, res) => {
	const { product_id, customer_id, shipment_id, quantity, status } = req.body;

	try {
		await pool.query(
			"INSERT INTO orders (product_id, customer_id, shipment_id, quantity, status) VALUES ($1, $2, $3, $4, $5)",
			[product_id, customer_id, shipment_id, quantity, status]
		);
		res.status(201).json({ message: "Order created succesfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateOrder = async (req, res) => {
	const { id } = req.params;
	const { product_id, customer_id, shipment_id, quantity, status } = req.body;

	try {
		await pool.query(
			"UPDATE orders SET product_id = $1, customer_id = $2, shipment_id = $3, quantity = $4, status = $5 WHERE id = $6",
			[product_id, customer_id, shipment_id, quantity, status, id]
		);
		res.status(200).json({ message: "Order updated successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteOrder = async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query("DELETE FROM orders WHERE id = $1", [id]);
		res.status(200).json({ message: "Order deleted successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getOrders,
	getOrderById,
	createOrder,
	updateOrder,
	deleteOrder,
};
