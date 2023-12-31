import { Product } from "../models/Product";
import api from "./apiConfig";

// api post request to add product
export const addProductApi = async (product: any) => {
  try {
    const response = await api.post(`product/addProduct`, product);
    if (response.status === 201) return response.data;
  } catch (err) {
    throw err;
  }
};

// api request to get all products from database
export const getProducts = async () => {
  try {
    const response = await api.get("product/getAllProducts");
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// api request to get all products matching the search term
export const searchProductsApi = async (searchString: string) => {
  try {
    const response = await api.get(
      `product/searchProducts?productName=${searchString}`
    );
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};

// api request to update a product
export const editProductApi = async (
  product: Product | FormData,
  productId: string
) => {
  try {
    const response = await api.put(`product/editProduct/${productId}`, product);
    if (response.status === 200) return response.data;
  } catch (err) {
    throw err;
  }
};
