import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "./cartSlice";
import categorySlice from "./categorySlice";
import userSlice from "./userSlice";
import productSlice from "./productSlice";

// This configuration allows the userReducer,cartReducer to be persisted in local storage
const userPersistConfig = {
  key: "user",
  storage,
};

const cartPersistConfig = {
  key: "shoppingCart",
  storage,
};

// This configuration allows the userReducer,cartReducer to be persisted in local storage
const persistedUserReducer = persistReducer(userPersistConfig, userSlice);
const persistedCartReducer = persistReducer(cartPersistConfig, cartSlice);

// Combining all the reducers in the application
const reducers = {
  user: persistedUserReducer,
  products: productSlice,
  shoppingCart: persistedCartReducer,
  category: categorySlice,
};

// Configuring the Redux store
const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    thunk: true,
  }),
});

// Creating a persistor using the store
let persistor = persistStore(store);

// Define a type for the whole state of the app
export type RootState = ReturnType<typeof store.getState>;

export { store, persistor };
