import axios from "axios";

const API_BASE_URL = "https://supply-chain-dashboard-3e5637c94499.herokuapp.com/api/inventory";

// Inventory API
export const getInventory = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching inventory:", error.message);
		throw new Error("Failed to fetch inventory. Please try again later.");
	}
};

export const getInventoryById = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching inventory item with ID ${id}:`, error.message);
		throw new Error(`Failed to fetch inventory item with ID ${id}. Please try again later.`);
	}
};

export const createInventory = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error("Error creating inventory item:", error.message);
		throw new Error("Failed to create inventory item. Please check your input and try again.");
	}
};

export const updateInventory = async (id, data) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating inventory item with ID ${id}:`, error.message);
		throw new Error(
			`Failed to update inventory item with ID ${id}. Please check your input and try again.`
		);
	}
};

export const deleteInventory = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting inventory item with ID ${id}:`, error.message);
		throw new Error(`Failed to delete inventory item with ID ${id}. Please try again later.`);
	}
};
