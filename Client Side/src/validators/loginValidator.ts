import { FieldError, Resolver } from "react-hook-form";
import { LoginFormValues } from "../types/LoginFormValues";
import { emailValidator, passwordValidator } from "./commonValidators";

// defining type for potential errors in the form data.
type FormErrors = {
  [K in keyof LoginFormValues]?: FieldError;
};

//function that validates form data.
export const resolver: Resolver<LoginFormValues> = async values => {
  //empty object to hold any errors that are found in the form data.
  const errors: FormErrors = {};

  // email validator
  const emailError = emailValidator(values.email);
  if (emailError) {
    errors.email = emailError;
  }

  // password validator
  const passwordError = passwordValidator(values.password);
  if (passwordError) {
    errors.password = passwordError;
  }

  //return an object with the valid form values and any errors.
  // If there are any errors, the values are an empty object.
  return {
    values: Object.keys(errors).length > 0 ? {} : values,
    errors,
  };
};
