import axios from "axios";

const API_BASE_URL = "https://supply-chain-dashboard-3e5637c94499.herokuapp.com/api/products";

export const getProducts = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching products:", error.message);
		throw new Error("Failed to fetch products. Please try again later.");
	}
};

export const getProductById = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching product with ID ${id}:`, error.message);
		throw new Error(`Failed to fetch product with ID ${id}. Please try again later.`);
	}
};

export const createProduct = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error("Error creating product:", error.message);
		throw new Error("Failed to create product. Please check your input and try again.");
	}
};

export const updateProduct = async (id, data) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating product with ID ${id}:`, error.message);
		throw new Error(
			`Failed to update product with ID ${id}. Please check your input and try again.`
		);
	}
};

export const deleteProduct = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting product with ID ${id}:`, error.message);
		throw new Error(`Failed to delete product with ID ${id}. Please try again later.`);
	}
};
