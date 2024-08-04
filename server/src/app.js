const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000; // Corrected to 'PORT'

app.use(cors());
app.use(express.json());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, "../../client/build")));

// API endpoint example
app.get("/api", (req, res) => {
	res.send("API is running...");
});

// Handle any other routes (i.e., serve the React app)
app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../../client/build", "index.html"));
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
