const pool = require("../db");

const getInventory = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM inventory");
		res.status(200).json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getInventoryById = async (req, res) => {
	const { id } = req.body;

	try {
		const result = await pool.query("SELECT * FROM inventory WHERE id = $1", [id]);
		res.status(200).json(result.rows[0]);
	} catch (err) {}
};

const createInventory = async (req, res) => {
	const { product_id, supplier_id, quantity, location } = req.body;

	try {
		await pool.query(
			"INSERT INTO inventory (product_id, supplier_id, quantity, location) VALUES ($1, $2, $3, $4)",
			[product_id, supplier_id, quantity, location]
		);
		res.status(201).json({ message: "Inventory created successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateInventory = async (req, res) => {
	const { id } = req.params;
	const { product_id, supplier_id, quantity, location } = req.body;

	try {
		await pool.query(
			"UPDATE inventory SET product_id = $1, supplier_id = $2, quantity = $3, location = $4 WHERE id = $5",
			[product_id, supplier_id, quantity, location, id]
		);

		res.status(200).json("Inventory updated successfully!");
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteInventory = async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query("DELETE FROM inventory WHERE id = $1", [id]);
		res.status(200).json({ message: "Inventory item deleted successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getInventory,
	getInventoryById,
	createInventory,
	updateInventory,
	deleteInventory,
};
