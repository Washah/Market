import { Avatar, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import LoginIcon from "@mui/icons-material/Login";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { resolver } from "../../validators/loginValidator";
import { LoginFormValues } from "../../types/LoginFormValues";
import FormInput from "../FormInput";
import { login } from "../../api/userApi";
import { toast } from "react-toastify";
import { setLogin } from "../../redux/userSlice";
import { useDispatch } from "react-redux";
import StartShopping from "../StartShopping/StartShopping";
import Button from "../Button/Button";
import { checkShoppingCart } from "../../api/cartApi";
import { useUserState } from "../../hooks/useUserState";
import { setCart } from "../../redux/cartSlice";
import { useCartState } from "../../hooks/useCartState";
import { useCartApi } from "../../hooks/useCartApi";

export const Login = () => {
  // custom hook to get user from the Redux store
  const { user } = useUserState();
  const { cartId } = useCartState();

  // custom hook to get functions for interacting with the API
  const { getAllCartItems } = useCartApi(cartId);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginFormValues>({ resolver });

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // what happens when the form is submitted.
  const onSubmit = handleSubmit(async data => {
    try {
      const response = await login(data);
      // If login is successful, update the Redux store with the user and token
      if (response) {
        dispatch(setLogin({ user: response.user, token: response.token }));
        // check for cart only for user
        if (response.user.role === "user") {
          const res = await checkShoppingCart(response.user._id);
          if (res) {
            dispatch(setCart(res));
            getAllCartItems(res._id);
          }
          // if admin logged in navigate to shopping page
        } else
          setTimeout(() => {
            navigate("/shopping");
          }, 50);
        reset();
      }
    } catch (err: any) {
      // If there's an error,show a toast notification with the error message
      toast.error(err.response.data.message);
      console.error(err);
    }
  });

  return (
    <>
      {user ? (
        <StartShopping />
      ) : (
        <div className="login">
          <div className="login__header center">
            <Typography
              variant="h3"
              gutterBottom
              className="blueText login__header--text"
              sx={{
                fontFamily: "Josefin Sans",
                fontWeight: 400,
              }}
            >
              Login
            </Typography>
            <Avatar
              sx={{ marginBottom: "3rem", bgcolor: "rgb(30, 7, 199)" }}
              className="blueText"
            >
              <LoginIcon />
            </Avatar>
          </div>
          <div className="login__form">
            <form onSubmit={onSubmit}>
              <FormInput
                register={register("email")}
                name="email"
                label="Email"
                type="text"
                error={!!errors.email}
                helperText={errors.email?.message}
              />
              <FormInput
                register={register("password")}
                name="password"
                label="Password"
                type="password"
                error={!!errors.password}
                helperText={errors.password?.message}
              />
              <div className="login__form--buttons">
                <Button type="submit" text="Login" color=" rgb(30, 7, 199)" />
                <Button type="reset" text="reset" color=" rgb(109, 112, 104)" />
              </div>
            </form>
            <div className="login__registerLink ">
              Don't have an account yet? <Link to="/register">Register!</Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
