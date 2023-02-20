import React from "react";
import classes from "./ErrorModal.module.css";
import { createPortal } from "react-dom";
import Button from "./Button";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../store/errorModalSlice";

function ErrorModal(props) {
	const dispatch = useDispatch();

	const state = useSelector((state) => state.errorModal);

	if (!state.show) {
		return null;
	}

	return (
		<>
			{createPortal(
				<>
					<div className={classes.backdrop} onClick={props.onConfirm} />
					<div className={classes.modal}>
						<header className={classes.header}>
							<h2>An error occured</h2>
						</header>
						<div className={classes.content}>
							<p>{state.message}</p>
						</div>
						<footer className={classes.actions}>
							<Button onClick={() => dispatch(hideModal())} text="Okay" />
						</footer>
					</div>
				</>,
				document.getElementById("modal-root")
			)}
		</>
	);
}

export default ErrorModal;
