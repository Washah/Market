import React from "react";
import { useCategory } from "../../hooks/useCategory";
import { Category } from "../../models/Category";
import "./CategoryNavbar.css";
import { useCategoryState } from "../../hooks/useCategoryState";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  resetSelectedCategory,
  setSelectedCategory,
} from "../../redux/categorySlice";
import { CircularProgress } from "@mui/material";

type CategoryProps = {
  onSelectCategory: (Category: string) => void;
};

const CategoryNavbar: React.FC<CategoryProps> = ({ onSelectCategory }) => {
  // get all categories from a custom hook
  const { categories, isLoading } = useCategory();

  // State to track the currently active category
  const { selectedCategory } = useCategoryState();

  const dispatch = useDispatch();

  // handler for category selection
  const handleSelectCategory = (category: Category) => {
    // If clicked category is already active, deactivate it
    if (selectedCategory === category._id) {
      dispatch(resetSelectedCategory());
      onSelectCategory("");
    } else {
      // Otherwise, activate the clicked category
      dispatch(setSelectedCategory(category._id));
      onSelectCategory(category._id);
    }
  };

  const location = useLocation();

  // reset selected category when location changes
  React.useEffect(() => {
    dispatch(resetSelectedCategory());
    onSelectCategory("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  return (
    <div className="categoryNavbar">
      {isLoading ? (
        <CircularProgress size={17} />
      ) : (
        <>
          {/* map all categories to display */}
          {categories.map((category: Category) => (
            <ul
              // Apply 'active' class if the category is currently active
              className={`category ${category._id === selectedCategory ? "active" : ""
                }`}
              key={category._id}
              onClick={() => {
                handleSelectCategory(category);
              }}
            >
              <li className="category__link blueText">
                {category.categoryName}
              </li>
            </ul>
          ))}
        </>
      )}
    </div>
  );
};

export default CategoryNavbar;
