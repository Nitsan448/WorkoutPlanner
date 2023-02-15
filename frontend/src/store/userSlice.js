import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
	name: "user",
	initialState: {
		loggedIn: false,
	},
	reducers: {
		setLoggedInState: (state, action) => {
			state.loggedIn = action.payload;
		},
	},
});

export const { setLoggedInState } = userSlice.actions;

export default userSlice.reducer;
