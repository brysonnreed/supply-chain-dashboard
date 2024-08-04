const pool = require("../db");

const getAllCustomers = async (req, res) => {
	try {
		const result = await query.pool("SELECT * FROM customers");
		res.status(200).json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getCustomerById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query("SELECT * FROM customers WHERE id = $1", [id]);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows[0]);
		} else {
			res.status(404).json({ message: "Customer not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createCustomer = async (req, res) => {
	const { name, email, address, phone_number } = req.body;

	try {
		await pool.query(
			"INSERT INTO customers (name, email, address, phone_number) VALUES ($1, $2, $3, $4)",
			[name, email, address, phone_number]
		);
		res.status(201).json({ message: "Customer created successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateCustomer = async (req, res) => {
	const { id } = req.params;
	const { name, email, address, phone_number } = req.body;

	try {
		await pool.query(
			"UPDATE customers SET name = $1, email = $2, address = $3, phone_number = $4 WHERE id = $5",
			[name, email, address, phone_number, id]
		);
		res.status(200).json({ message: "Customer updated successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteCustomer = async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query("DELETE FROM customers WHERE id = $1"), [id];
		res.status(200).json({ message: "Customer deleted successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getAllCustomers,
	getCustomerById,
	createCustomer,
	updateCustomer,
	deleteCustomer,
};
