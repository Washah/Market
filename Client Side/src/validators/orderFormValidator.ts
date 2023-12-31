import { FieldError, Resolver } from "react-hook-form";
import { OrderFormValues } from "../types/OrderFormValues";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof OrderFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<OrderFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // Check if the productName is empty.
  if (!values.deliveryCity || values.deliveryCity.length === 0) {
    errors.deliveryCity = {
      type: "required",
      message: "City name is required",
    };
  }

  // Check if the Category is empty.
  if (!values.deliveryStreet || values.deliveryStreet.length === 0) {
    errors.deliveryStreet = {
      type: "required",
      message: "Street name is required",
    };
  }

  // Check if the Category is empty.
  if (!values.deliveryDate || values.deliveryDate.length === 0) {
    errors.deliveryDate = {
      type: "required",
      message: "Shipping date is required",
    };
  }

  // Check if the image is empty.
  const creditCardRegex = /^(?:\d{13,19})$/;

  if (!values.paymentMethodLast4Digits) {
    errors.paymentMethodLast4Digits = {
      type: "required",
      message: "Credit card is required",
    };
  } else if (!creditCardRegex.test(values.paymentMethodLast4Digits)) {
    errors.paymentMethodLast4Digits = {
      type: "invalid",
      message: "Invalid credit card format",
    };
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};
