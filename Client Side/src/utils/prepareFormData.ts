import { Product } from "../models/Product";

// Function to prepare the form data before submitting
export const prepareFormData = (data: Product) => {
  const formData = new FormData();
  formData.append("categoryId", data.categoryId);
  formData.append("productName", data.productName);
  formData.append("price", data.price.toString());
  formData.append(
    "imagePath",
    typeof data.imagePath === "string" ? data.imagePath : data.imagePath[0]
  );
  return formData;
};
