import axios from "axios";
import type { Product } from "../components/types";

const API_URL = "http://localhost:8080";

export const getAllProducts = async () => {
  const response = await axios.get(`${API_URL}/products`);
  return response.data;
};

export const getProductById = async (id: number) => {
  const response = await axios.get(`${API_URL}/product/${id}`);
  console.log("******************");
  console.log(response.data);

  return response.data;
};

export const deleteProductById = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/delete/product/${id}`);
};

export const updateProductById = async (id: number, product: Product) => {
  return await axios.put(`${API_URL}/updateProduct/${id}`, product);
};
