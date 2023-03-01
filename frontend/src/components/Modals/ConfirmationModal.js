import React from "react";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

function ConfirmationModal(props) {
	return (
		<Modal onCancel={props.onCancel} title={props.title} message={props.message}>
			<Button whiteButton onClick={props.onConfirm} text="Yes" />
			<Button onClick={props.onCancel} text="No" />
		</Modal>
	);
}

export default ConfirmationModal;
