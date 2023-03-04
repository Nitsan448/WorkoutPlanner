import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";
import uiReducer from "./uiSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: { [apiSlice.reducerPath]: apiSlice.reducer, user: userReducer, ui: uiReducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
