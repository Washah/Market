import { useSelector } from "react-redux";
import { RootState } from "../redux/Store";

export const useUserState = () => {
  // Get the user state from the Redux store
  const user = useSelector((state: RootState) => state.user.user);

  return { user };
};
