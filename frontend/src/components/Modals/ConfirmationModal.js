import React from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

function ConfirmationModal(props) {
	return (
		<Modal title={props.title} message={props.message}>
			<Button onClick={props.onConfirm} text="Yes" />
			<Button onClick={props.onCancel} text="No" />
		</Modal>
	);
}

export default ConfirmationModal;
