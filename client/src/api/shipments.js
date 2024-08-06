import axios from "axios";

const API_BASE_URL = "https://supply-chain-dashboard-3e5637c94499.herokuapp.com/api/shipments";

// Shipments API
export const getShipments = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching shipments:", error.message);
		throw new Error("Failed to fetch shipments. Please try again later.");
	}
};

export const getShipmentById = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching shipment with ID ${id}:`, error.message);
		throw new Error(`Failed to fetch shipment with ID ${id}. Please try again later.`);
	}
};

export const createShipment = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error("Error creating shipment:", error.message);
		throw new Error("Failed to create shipment. Please check your input and try again.");
	}
};

export const updateShipment = async (id, data) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating shipment with ID ${id}:`, error.message);
		throw new Error(
			`Failed to update shipment with ID ${id}. Please check your input and try again.`
		);
	}
};

export const deleteShipment = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting shipment with ID ${id}:`, error.message);
		throw new Error(`Failed to delete shipment with ID ${id}. Please try again later.`);
	}
};
