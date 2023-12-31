import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useCategoryState = () => {
  // Get the selected category from the Redux store
  const selectedCategory = useSelector(
    (state: RootState) => state.category.selectedCategory
  );

  return { selectedCategory };
};
