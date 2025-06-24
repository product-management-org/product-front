import axios from "axios";
import type { User } from "../components/types";

const API_URL = "http://localhost:8080";

export const getAllUsers = async (): Promise<User[]> => {
  const res = await axios.get(`${API_URL}/users`);
  return res.data;
};

export const getUserById = async (id: number): Promise<User> => {
  const res = await axios.get(`${API_URL}/user/${id}`);
  return res.data;
};

export const deleteUserById = async (id: number) => {
  await axios.delete(`${API_URL}/delete/user/${id}`);
};

export const updateUser = async (id: number, userData: Partial<User>) => {
  const response = await axios.put(`${API_URL}/updateUser/${id}`, userData);
  return response.data;
};
