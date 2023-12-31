import React from "react";
import { getProducts } from "../api/productApi";
import { useDispatch } from "react-redux";
import { getAllProducts } from "../redux/productSlice";

// hook to get all products from database
export const useProduct = () => {
  const [products, setProducts] = React.useState([]);
  const dispatch = useDispatch();

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getProducts();
        // dispatch the response to redux
        dispatch(getAllProducts(response));
        setProducts(response);
      } catch (err: any) {
        console.error(err);
      }
    };
    fetchData();
  }, [dispatch]);
  return products;
};
