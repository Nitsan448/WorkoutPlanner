import React from "react";
import classes from "./Modal.module.css";
import { createPortal } from "react-dom";

function Modal(props) {
	return (
		<>
			{createPortal(
				<>
					<div className={classes.backdrop} onClick={props.onConfirm} />
					<div className={classes.modal}>
						<header className={classes.header}>
							<h2>{props.title}</h2>
						</header>
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
