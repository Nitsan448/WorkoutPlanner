import React from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal(props) {
	return (
		<>
			{props.showModal &&
				createPortal(
					<>
						<div className={classes.backdrop} onClick={props.onCancel} />
						<div className={classes.modal}>
							<h2 className={classes.title}>{props.title}</h2>
							<div className={classes.content}>
								<p>{props.message}</p>
							</div>
							<footer className={classes.actions}>{props.children}</footer>
						</div>
					</>,
					document.getElementById("modal-root")
				)}
		</>
	);
}

export default Modal;
