import { configureStore } from "@reduxjs/toolkit";
import workoutSlice from "./workout-slice";

const store = configureStore({
	reducer: { currentWorkout: workoutSlice.reducer },
});

export default store;
