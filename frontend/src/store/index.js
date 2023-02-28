import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import errorModalReducer from "./errorModalSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: { [apiSlice.reducerPath]: apiSlice.reducer, user: userReducer, errorModal: errorModalReducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
