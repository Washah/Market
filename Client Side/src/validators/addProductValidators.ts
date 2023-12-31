import { FieldError, Resolver } from "react-hook-form";
import { AddProductFormValues } from "../types/AddProductFormValues";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof AddProductFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<AddProductFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // Check if the productName is empty.
  if (!values.productName || values.productName.length === 0) {
    errors.productName = {
      type: "required",
      message: "Product name is required",
    };
  }

  // Check if the Category is empty.
  if (!values.categoryId || values.categoryId.length === 0) {
    errors.categoryId = {
      type: "required",
      message: "Category name is required",
    };
  }

  // Check if the price is empty or 0.
  if (!values.price) {
    errors.price = {
      type: "required",
      message: "Price is required",
    };
  } else if (values.price < 1) {
    errors.price = {
      type: "required",
      message: "Price must be greater than zero",
    };
  }

  // Check if the image is empty.
  if (!values.imagePath || values.imagePath.length === 0) {
    errors.imagePath = {
      type: "required",
      message: "Image is required",
    };
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};
