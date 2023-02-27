import { configureStore } from "@reduxjs/toolkit";
import { mainApiSlice } from "./mainApiSlice";
import errorModalReducer from "./errorModalSlice";
import userReducer from "./userSlice";

const store = configureStore({
	reducer: { [mainApiSlice.reducerPath]: mainApiSlice.reducer, user: userReducer, errorModal: errorModalReducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mainApiSlice.middleware),
});

export default store;
