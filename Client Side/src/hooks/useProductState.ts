import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useProductState = () => {
  // Get all products from the Redux store
  const products = useSelector((state: RootState) => state.products.products);
  const searchProducts = useSelector(
    (state: RootState) => state.products.searchProducts
  );
  const productEdit = useSelector(
    (state: RootState) => state.products.productToEdit
  );

  return { products, searchProducts, productEdit };
};
