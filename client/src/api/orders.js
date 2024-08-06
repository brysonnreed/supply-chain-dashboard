import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api/orders";

// Orders API
export const getOrders = async () => {
	try {
		const response = await axios.get(API_BASE_URL);
		return response.data;
	} catch (error) {
		console.error("Error fetching orders:", error.message);
		throw new Error("Failed to fetch orders. Please try again later.");
	}
};

export const getOrderById = async (id) => {
	try {
		const response = await axios.get(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error fetching order with ID ${id}:`, error.message);
		throw new Error(`Failed to fetch order with ID ${id}. Please try again later.`);
	}
};

export const createOrder = async (data) => {
	try {
		const response = await axios.post(API_BASE_URL, data);
		return response.data;
	} catch (error) {
		console.error("Error creating order:", error.message);
		throw new Error("Failed to create order. Please check your input and try again.");
	}
};

export const updateOrder = async (id, data) => {
	try {
		const response = await axios.put(`${API_BASE_URL}/${id}`, data);
		return response.data;
	} catch (error) {
		console.error(`Error updating order with ID ${id}:`, error.message);
		throw new Error(`Failed to update order with ID ${id}. Please check your input and try again.`);
	}
};

export const deleteOrder = async (id) => {
	try {
		const response = await axios.delete(`${API_BASE_URL}/${id}`);
		return response.data;
	} catch (error) {
		console.error(`Error deleting order with ID ${id}:`, error.message);
		throw new Error(`Failed to delete order with ID ${id}. Please try again later.`);
	}
};
