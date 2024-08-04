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
	const { prduct_id, supplier_id, quantity } = req.body;

	try {
		await pool.query(
			"INSERT INTO inventory (product_id, supplier_id, quantity) VALUES ($1, $2, $3)",
			[prduct_id, supplier_id, quantity]
		);
		res.status(201).json({ message: "Inventory created successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateInventory = async (req, res) => {
	const { product_id, supplier_id, quantity } = req.body;

	try {
		await pool.query(
			"UPDATE inventory SET quantity = $1, updated_at = NOW() WHERE product_id = $2",
			[quantity, product_id, supplier_id]
		);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows[0]);
		} else {
			res.status(404).json({ message: "Inventory item not found" });
		}
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
