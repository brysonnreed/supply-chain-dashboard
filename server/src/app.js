const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000; // Corrected to 'PORT'

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
	res.send("API is running...");
	res.sendFile(path.join(__dirname, "../../client/build/index.html"), function (err) {
		if (err) {
			res.status(500).send(err);
		}
	});
});

// Start the server
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`);
});
