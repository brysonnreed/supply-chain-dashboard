const pool = require("../db");

const getSuppliers = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM suppliers");
		res.status(200).json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getSupplierById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query("SELECT * FROM suppliers WHERE id = $1", [id]);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows[0]);
		} else {
			res.status(404).json({ message: "Supplier not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createSupplier = async (req, res) => {
	const { name, contact_info } = req.body;

	try {
		await pool.query("INSERT INTO suppliers (name, contact_info) VALUES ($1, $2)", [
			name,
			contact_info,
		]);
		res.status(201).json({ message: "Supplier created succesfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateSupplier = async (req, res) => {
	const { id } = req.params;
	const { name, contact_info } = req.body;

	try {
		await pool.query("UPDATE suppliers SET name = $1, contact_info = $2 WHERE id = $3", [
			name,
			contact_info,
			id,
		]);
		res.status(200).json({ message: "Supplier updated successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteSupplier = async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query("DELETE FROM suppliers WHERE id = $1", [id]);
		res.status(200).json({ message: "Supplier deleted successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getSuppliers,
	getSupplierById,
	createSupplier,
	updateSupplier,
	deleteSupplier,
};
