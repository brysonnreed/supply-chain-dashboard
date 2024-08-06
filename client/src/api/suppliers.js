import axios from "axios";

const API_BASE_URL = "https://supply-chain-dashboard-3e5637c94499.herokuapp.com/api/suppliers";

// Suppliers API
export const getSuppliers = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching suppliers:", error.message);
		throw new Error("Failed to fetch suppliers. Please try again later.");
	}
};

export const getSupplierById = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching supplier with ID ${id}:`, error.message);
		throw new Error(`Failed to fetch supplier with ID ${id}. Please try again later.`);
	}
};

export const createSupplier = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error("Error creating supplier:", error.message);
		throw new Error("Failed to create supplier. Please check your input and try again.");
	}
};

export const updateSupplier = async (id, data) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating supplier with ID ${id}:`, error.message);
		throw new Error(
			`Failed to update supplier with ID ${id}. Please check your input and try again.`
		);
	}
};

export const deleteSupplier = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting supplier with ID ${id}:`, error.message);
		throw new Error(`Failed to delete supplier with ID ${id}. Please try again later.`);
	}
};
