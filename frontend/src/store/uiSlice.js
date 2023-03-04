import { createSlice } from "@reduxjs/toolkit";

export const uiSlice = createSlice({
	name: "ui",
	initialState: {
		errorModal: { show: false, message: "" },
		unsavedChanges: false,
	},
	reducers: {
		showErrorModal: (state, action) => {
			state.errorModal.show = true;
			state.errorModal.message = action.payload;
		},
		hideErrorModal: (state) => {
			state.errorModal.show = false;
		},
		setUnsavedChanges: (state, action) => {
			state.unsavedChanges = action.payload;
		},
	},
});

export const { showErrorModal, hideErrorModal, setUnsavedChanges } = uiSlice.actions;

export default uiSlice.reducer;
