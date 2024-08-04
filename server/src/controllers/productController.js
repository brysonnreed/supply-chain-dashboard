const pool = require("../db");

const getProducts = async (req, res) => {
	try {
		const result = await pool.query(`SELECT * FROM products`);
		res.status(200).json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getProductById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows[0]);
		} else {
			res.status(404).json({ message: "Product not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createProduct = async (req, res) => {
	const { name, description, price, stock_quantity } = req.body;

	try {
		await pool.query(
			`INSERT INTO products (name, description, price, stock_quantity) VALUES ($1, $2, $3, $4)`,
			[name, description, price, stock_quantity]
		);
		res.status(201).json({ message: "Product created succesfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateProduct = async (req, res) => {
	const { id } = req.params;
	const { name, description, price, stock_quantity } = req.body;

	try {
		await pool.query(
			"UPDATE products SET name = $1, description = $2, price = $3, stock_quantity = $4 WHERE id = $5",
			[name, description, price, stock_quantity, id]
		);
		res.status(200).json({ message: "Product updated successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteProduct = async (req, res) => {
	const { id } = req.params;

	try {
		await pool.query("DELETE FROM products WHERE id = $1", [id]);
		res.status(200).json({ message: "Product deleted successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getProducts,
	getProductById,
	createProduct,
	updateProduct,
	deleteProduct,
};
