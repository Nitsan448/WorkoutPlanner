import { createSlice } from "@reduxjs/toolkit";

export const errorModalSlice = createSlice({
	name: "modal",
	initialState: {
		error: { show: false, message: "" },
	},
	reducers: {
		showErrorModal: (state, action) => {
			state.error.show = true;
			state.error.message = action.payload;
		},
		hideErrorModal: (state) => {
			state.error.show = false;
		},
	},
});

export const { showErrorModal, hideErrorModal } = errorModalSlice.actions;

export default errorModalSlice.reducer;
