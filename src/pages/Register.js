import React from "react";
import useInput from "../hooks/use-input";
import classes from "../components/Exercises/ExerciseForm.module.css";
import Button from "../components/UI/Button";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../store/apiSlice";

function Register(props) {
	const navigate = useNavigate();

	const userNameInput = useInput((value) => value.trim() !== "");
	const emailInput = useInput((value) => /\S+@\S+\.\S+/.test(value));
	const passwordInput = useInput((value) => value.length > 4);
	const verifyPasswordInput = useInput((value) => value === passwordInput.value);

	const userNameInputClasses = userNameInput.hasError ? classes.invalid : "";
	const emailInputClasses = emailInput.hasError ? classes.invalid : "";
	const passwordInputClasses = passwordInput.hasError ? classes.invalid : "";
	const verifyPasswordInputClasses = verifyPasswordInput.hasError ? classes.invalid : "";

	const formIsValid =
		userNameInput.isValid && emailInput.isValid && passwordInput.isValid && verifyPasswordInput.isValid;

	const [register] = useRegisterMutation();

	async function registerHandler(event) {
		event.preventDefault();
		await register({
			user_name: userNameInput.value,
			email: emailInput.value,
			password: passwordInput.value,
		});
		navigate(`/workouts`);
	}

	return (
		<div className={classes.form}>
			<form onSubmit={registerHandler}>
				<div className={classes.form_group}>
					<label>User name:</label>
					<input
						className={userNameInputClasses}
						type="text"
						value={userNameInput.value}
						onChange={userNameInput.valueChangeHandler}
						onBlur={userNameInput.inputBlurHandler}
					/>
					{userNameInput.hasError && <p className={classes.invalid}>Name cannot be empty</p>}
				</div>
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
				<div className={classes.form_group}>
					<label>Verify password:</label>
					<input
						className={verifyPasswordInputClasses}
						type="password"
						value={verifyPasswordInput.value}
						onChange={verifyPasswordInput.valueChangeHandler}
						onBlur={verifyPasswordInput.inputBlurHandler}
					/>
					{verifyPasswordInput.hasError && <p className={classes.invalid}>Passwords must match</p>}
				</div>
				<Button text="Register" disabled={!formIsValid} />
			</form>
			<Link to="/Login">Login</Link>
		</div>
	);
}

export default Register;
