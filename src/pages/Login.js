import React, { useEffect } from "react";
import useInput from "../hooks/use-input";
import classes from "../components/Exercises/ExerciseForm.module.css";
import Button from "../components/UI/Button";
import { login } from "../lib/authApi";
import useHttp from "../hooks/use-http";
import { useNavigate } from "react-router-dom";

function Login(props) {
	const navigate = useNavigate();

	const emailInput = useInput((value) => /\S+@\S+\.\S+/.test(value));
	const passwordInput = useInput((value) => value.length > 4);

	const emailInputClasses = emailInput.hasError ? classes.invalid : "";
	const passwordInputClasses = passwordInput.hasError ? classes.invalid : "";

	const formIsValid = emailInput.isValid && passwordInput.isValid;

	const {
		sendRequest: sendloginRequest,
		status: loginRequestStatus,
		error: loginRequestError,
	} = useHttp(login, false);

	function loginHandler(event) {
		event.preventDefault();
		sendloginRequest({
			email: emailInput.value,
			password: passwordInput.value,
		});
	}

	useEffect(() => {
		if (loginRequestStatus === "completed" && !loginRequestError) {
			navigate(`/workouts`);
		}
	}, [loginRequestError, loginRequestStatus]);

	return (
		<div className={classes.form}>
			<form onSubmit={loginHandler}>
				<div className={classes.form_group}>
					<label>Email:</label>
					<input
						className={emailInputClasses}
						type="email"
						value={emailInput.value}
						onChange={emailInput.valueChangeHandler}
						onBlur={emailInput.inputBlurHandler}
					/>
					{emailInput.hasError && <p className={classes.invalid}>Email is not valid</p>}
				</div>
				<div className={classes.form_group}>
					<label>Password:</label>
					<input
						className={passwordInputClasses}
						type="password"
						value={passwordInput.value}
						onChange={passwordInput.valueChangeHandler}
						onBlur={passwordInput.inputBlurHandler}
					/>
					{passwordInput.hasError && (
						<p className={classes.invalid}>Password must be longer than 4 character</p>
					)}
				</div>
				<Button text="Login" disabled={!formIsValid} />
			</form>
			{loginRequestStatus === "pending" ? <h3>Logging in...</h3> : ""}
			{loginRequestError ? <h3>{loginRequestError}</h3> : ""}
		</div>
	);
}

export default Login;
