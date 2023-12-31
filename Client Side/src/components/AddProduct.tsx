import { useForm } from "react-hook-form";
import { resolver } from "../validators/addProductValidators";
import { AddProductFormValues } from "../types/AddProductFormValues";
import FormInput from "./FormInput";
import { useCategory } from "../hooks/useCategory";
import { addProductApi, editProductApi } from "../api/productApi";
import { prepareFormData } from "../utils/prepareFormData";
import Button from "./Button/Button";
import { useDispatch } from "react-redux";
import { addProduct, editProduct, productToEdit } from "../redux/productSlice";
import { useProductState } from "../hooks/useProductState";
import React from "react";
import { Product } from "../models/Product";

const AddProduct = () => {
  // check if there product to edit
  const { productEdit } = useProductState();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<AddProductFormValues>({ resolver });
  const dispatch = useDispatch();

  // Function to add a product to the database
  const addProductDatabase = async (data: Product) => {
    try {
      const formData = prepareFormData(data);
      const response = await addProductApi(formData);
      if (response) dispatch(addProduct(response));
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  // Function to edit an existing product in the database
  const editProductDatabase = async (data: Product) => {
    try {
      const formData = prepareFormData(data);
      const response = await editProductApi(formData, productEdit!._id!);
      dispatch(editProduct(response));
      reset();
    } catch (err) {
      console.error(err);
    }
  };

  // Handler for form submission
  const onSubmit = handleSubmit(async data => {
    if (!productEdit) {
      addProductDatabase(data);
    } else {
      editProductDatabase(data);
    }
  });

  // Get the categories using a custom hook
  const { categories } = useCategory();

  // useEffect hook to populate form fields if there's a product to edit
  React.useEffect(() => {
    if (productEdit) {
      setValue("productName", productEdit.productName);
      setValue("price", productEdit.price);
      setValue("categoryId", productEdit.categoryId);
      setValue("imagePath", productEdit.imagePath);
    }
  }, [productEdit, setValue]);

  // reset the form back to add product
  const resetForm = () => {
    dispatch(productToEdit(null));
  };

  return (
    <div
      className="addProduct"
      style={{
        textAlign: "center",
        width: "80%",
        margin: "0 auto",
      }}
    >
      <h1 className="blueText" style={{ margin: "-1rem 0 1.5rem 0" }}>
        {!productEdit ? "Add Product" : "Edit Product "}
      </h1>
      <form onSubmit={onSubmit}>
        <FormInput
          register={register("productName")}
          name="productName"
          label="Product Name"
          type="text"
          error={!!errors.productName}
          helperText={errors.productName?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormInput
          name="categoryId"
          label="Category Name"
          type="select"
          control={control}
          selectOptions={categories}
          error={!!errors.categoryId}
          helperText={errors.categoryId?.message}
        />
        <FormInput
          register={register("price")}
          name="price"
          label="Price"
          type="number"
          error={!!errors.price}
          helperText={errors.price?.message}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <FormInput
          register={register("imagePath")}
          name="imagePath"
          label={
            productEdit ? "Select new image or leave it empty" : "Product image"
          }
          type="file"
          error={!!errors.imagePath}
          helperText={errors.imagePath?.message}
        />
        <div className="login__form--buttons">
          <Button
            type="submit"
            text={productEdit ? "edit product" : "add product"}
            color=" rgb(103, 32, 180)"
          />
          <Button
            type="reset"
            text="cancel"
            color=" rgb(109, 112, 104)"
            onClick={resetForm}
          />
        </div>
      </form>
    </div>
  );
};

export default AddProduct;
