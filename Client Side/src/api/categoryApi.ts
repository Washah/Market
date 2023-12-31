import api from "./apiConfig";

// api get request to get all categories
export const getAllCategories = async () => {
  try {
    const response = await api.get(`category/getAllCategories`);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
