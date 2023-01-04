import React from "react";
import useInput from "../hooks/use-input";
import classes from "../components/Exercises/ExerciseForm.module.css";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/apiSlice";
import { Link } from "react-router-dom";

function Login(props) {
	const navigate = useNavigate();

	const emailInput = useInput((value) => /\S+@\S+\.\S+/.test(value));
	const passwordInput = useInput((value) => value.length > 4);

	const emailInputClasses = emailInput.hasError ? classes.invalid : "";
	const passwordInputClasses = passwordInput.hasError ? classes.invalid : "";

	const formIsValid = emailInput.isValid && passwordInput.isValid;

	const [login] = useLoginMutation();

	async function loginHandler(event) {
		event.preventDefault();
		login({
			email: emailInput.value,
			password: passwordInput.value,
		});
		navigate(`/workouts`);
	}

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
			<Link to="/Register">Register</Link>
		</div>
	);
}

export default Login;
