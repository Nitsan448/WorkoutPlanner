import React from "react";
import Button from "../UI/Button";
import { hideErrorModal } from "../../store/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../UI/Modal";

function ErrorModal(props) {
	const dispatch = useDispatch();
	const errorModal = useSelector((state) => state.modals.error);

	if (!errorModal.show) {
		return null;
	}

	return (
		<Modal title="An error occured" message={errorModal.message}>
			<Button onClick={() => dispatch(hideErrorModal())} text="Okay" />
		</Modal>
	);
}

export default ErrorModal;
