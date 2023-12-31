import { User } from "../models/User";
import api from "./apiConfig";

// function to login the user
export const login = async (data: { email: string; password: string }) => {
  try {
    const response = await api.post("/user/login", data);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// function checks if a given email or id already exists in the database
export const checkEmailId = async (email: string, idNumber: number) => {
  try {
    const response = await api.get(`/user/checkEmailId/${email}/${idNumber}`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// function to register new user
export const registerUser = async (newUser: User) => {
  try {
    const response = await api.post(`/user/register`, newUser);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};
