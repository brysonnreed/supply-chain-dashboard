const app = require("./app");
const PORT = process.env.port || 5000;

app.listen(PORT, () => {
	console.log(`Server Running on Port ${PORT}`);
});