import { useState } from "react";
import { checkEmailId, registerUser } from "../api/userApi";
import { setLogin } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { User } from "../models/User";
import { checkShoppingCart } from "../api/cartApi";
import { setCart } from "../redux/cartSlice";

export function useRegister() {
  // form data state
  const [formData, setFormData] = useState<User>({
    firstName: "",
    lastName: "",
    email: "",
    idNumber: 0,
    password: "",
    city: "",
    street: "",
  });

  // Redux dispatch function
  const dispatch = useDispatch();
  // React router navigate function
  const navigate = useNavigate();

  // Function to handle first step of registration
  const firstStepSubmit = async (data: User) => {
    try {
      // Check if email or id number already exists in the database
      const response = await checkEmailId(data.email, data.idNumber);
      if (response) return true;
    } catch (err) {
      throw err;
    }
    return false;
  };

  // Function to handle second step of registration
  const secondStepSubmit = (data: User) => {
    // Save form data in state
    setFormData(data);
    return true;
  };

  // Function to handle final step of registration
  const finalSubmit = async () => {
    try {
      // Register user with form data
      const response = await registerUser(formData);
      if (response) {
        // If successful, dispatch login action with response data
        dispatch(setLogin({ user: response.user, token: response.token }));
        const res = await checkShoppingCart(response.user._id);
        if (res) dispatch(setCart(res));
        // and then navigate to home page
        navigate("/");
      }
    } catch (err) {
      throw err;
    }
  };

  // Return functions to be used in the component
  return { firstStepSubmit, secondStepSubmit, finalSubmit };
}
