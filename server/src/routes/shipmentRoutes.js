const express = require("express");
const {
	getShipments,
	getShipmentById,
	createShipment,
	updateShipment,
	deleteShipment,
} = require("../controllers/shipmentController");

const router = express.Router();

router.get("/", getShipments);
router.get("/:id", getShipmentById);
router.post("/", createShipment);
router.put("/:id", updateShipment);
router.delete("/:id", deleteShipment);

module.exports = router;
