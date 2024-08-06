const express = require("express");
const cors = require("cors");
const path = require("path");

const customerRoutes = require("./routes/customerRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const productRoutes = require("./routes/productRoutes");
const shipmentRoutes = require("./routes/shipmentRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

const app = express();
const PORT = process.env.PORT || 5000; // Corrected to 'PORT'

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/build")));

// Handle any other routes (i.e., serve the React app)
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

// API Routes
app.use("/api/customers", customerRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);
app.use("/api/shipments", shipmentRoutes);
app.use("/api/suppliers", supplierRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send("Something broke!");
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
