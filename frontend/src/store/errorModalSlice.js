import { createSlice } from "@reduxjs/toolkit";

export const errorModalSlice = createSlice({
	name: "errorModal",
	initialState: {
		show: false,
		message: "",
	},
	reducers: {
		showModal: (state, action) => {
			state.show = true;
			state.message = action.payload;
		},
		hideModal: (state) => {
			state.show = false;
		},
	},
});

export const { showModal, hideModal } = errorModalSlice.actions;

export default errorModalSlice.reducer;
