const pool = require("../db");

const getShipments = async (req, res) => {
	try {
		const result = await pool.query("SELECT * FROM shipments");
		res.status(200).json(result.rows);
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const getShipmentById = async (req, res) => {
	const { id } = req.params;

	try {
		const result = await pool.query("SELECT * FROM shipments WHERE id = $1", [id]);
		if (result.rows.length > 0) {
			res.status(200).json(result.rows[0]);
		} else {
			res.status(404).json({ message: "Shipment not found" });
		}
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const createShipment = async (req, res) => {
	const { product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination } =
		req.body;

	try {
		await pool.query(
			"INSERT INTO shipments (product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination) VALUES ($1, $2, $3, $4, $5, $6)",
			[product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination]
		);
		res.status(201).json({ message: "Shipment created succesfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const updateShipment = async (req, res) => {
	const { id } = req.params;
	const { product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination } =
		req.body;

	try {
		await pool.query(
			"UPDATE shipments SET product_id = $1, order_id = $2, quantity = $3, shipment_date = $4, estimated_arrival = $5, status = $6, destination = $7 WHERE id = $8",
			[product_id, order_id, quantity, shipment_date, estimated_arrival, status, destination, id]
		);
		res.status(200).json({ message: "Shipment updated successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

const deleteShipment = async (req, res) => {
	const { id } = req.params;
	try {
		await pool.query("DELETE FROM shipments WHERE id = $1", [id]);
		res.status(200).json({ message: "Shipment deleted successfully!" });
	} catch (err) {
		res.status(500).json({ error: err.message });
	}
};

module.exports = {
	getShipments,
	getShipmentById,
	createShipment,
	updateShipment,
	deleteShipment,
};
