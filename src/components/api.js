// api/index.js
import axios from 'axios';

// Base URL for the API
const baseURL = 'http://localhost:8080/api';

// Create an instance of axios with the base URL of your API
const api = axios.create({
  baseURL: baseURL,
});


// Function to fetch all menu items
export const getMenuItems = async () => {
  const response = await api.get('/menu');
  return response.data;
};

// Function to place an order
export const placeOrder = async (orderData) => {
  const response = await api.post(  '/orders/place', orderData);
  return response.data;
};

export const searchMenuItems = async (dishName) => {
  const response = await api.get(`/menu/search`, {
    params: { dishName },
  });
  return response.data;
};