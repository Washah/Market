import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { User } from "../models/User";

// Define the type of the state
export interface UserState {
  user: User | null;
  token: string | null;
}

// Initial state
const initialState: UserState = {
  user: null,
  token: null,
};

// create a slice
const userSlice = createSlice({
  name: "user",
  initialState,
  // Define reducer functions and their corresponding action creators
  reducers: {
    setLogout: state => {
      state.user = null;
      state.token = null;
    },
    setLogin: (state, action: PayloadAction<{ user: User; token: string }>) => {
      state.user = action.payload.user;
      state.token = action.payload.token;
    },
  },
});

export const { setLogout, setLogin } = userSlice.actions;
export default userSlice.reducer;
