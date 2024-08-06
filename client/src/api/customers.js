import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/customers";

export const getCustomers = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching customers:", error.message);
		throw new Error("Failed to fetch customers. Please try again later.");
	}
};

export const getCustomerById = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching customer with ID ${id}:`, error.message);
		throw new Error(`Failed to fetch customer with ID ${id}. Please try again later.`);
	}
};

export const createCustomer = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error("Error creating customer:", error.message);
		throw new Error("Failed to create customer. Please check your input and try again.");
	}
};

export const updateCustomer = async (id, data) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating customer with ID ${id}:`, error.message);
		throw new Error(
			`Failed to update customer with ID ${id}. Please check your input and try again.`
		);
	}
};

export const deleteCustomer = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting customer with ID ${id}:`, error.message);
		throw new Error(`Failed to delete customer with ID ${id}. Please try again later.`);
	}
};
