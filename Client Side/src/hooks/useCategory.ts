import React from "react";
import { getAllCategories } from "../api/categoryApi";
import useLoading from "./useLoading";

export const useCategory = () => {
  const [categories, setCategories] = React.useState([]);

  // fetch all categories from database
  const fetchData = async () => {
    try {
      const response = await getAllCategories();
      setCategories(response);
    } catch (err: any) {
      console.error(err);
    }
  };

  // use the useLoading hook, passing the fetchData
  const isLoading = useLoading(fetchData, []);

  return { categories, isLoading };
};
