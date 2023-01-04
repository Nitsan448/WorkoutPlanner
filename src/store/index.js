import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "./workout-slice";
import { apiSlice } from "./apiSlice";

const store = configureStore({
	reducer: { workout: workoutSlice.reducer, [apiSlice.reducerPath]: apiSlice.reducer },
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
