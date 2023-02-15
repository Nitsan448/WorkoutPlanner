import React from "react";
import classes from "../components/Exercises/ExerciseForm.module.css";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/apiSlice";
// import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoggedInState } from "../store/userSlice";

function Login(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [login] = useLoginMutation();

	async function loginHandler(data) {
		try {
			await login({
				email_or_user_name: data.emailOrUserName,
				password: data.password,
			}).unwrap();
			clearErrors();
			dispatch(setLoggedInState(true));
			navigate(`/workouts`);
		} catch (error) {
			if (error.data === "User could not be found") {
				setError("emailOrUserName", { message: error.data });
			} else if (error.data === "Wrong password") {
				setError("password", { message: error.data });
			}
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		setError,
		clearErrors,
	} = useForm();

	return (
		<div className={classes.form}>
			<form onSubmit={handleSubmit(async (data) => await loginHandler(data))}>
				<div className={classes.form_group}>
					<label htmlFor="emailOrUserName">Email/User name:</label>
					<input
						type="text"
						className={errors.email_or_user_name ? classes.invalid : ""}
						{...register("emailOrUserName", {
							required: "Please enter your Email or user name",
						})}
					/>
					{errors.emailOrUserName && <p className={classes.invalid}>{errors.emailOrUserName.message}</p>}
				</div>
				<div className={classes.form_group}>
					<label htmlFor="password">Password:</label>
					<input
						type="password"
						className={errors.password ? classes.invalid : ""}
						{...register("password", {
							required: "Please enter your password",
							minLength: {
								value: 5,
								message: "Password is not valid",
							},
						})}
					/>
					{errors.password && <p className={classes.invalid}>{errors.password.message}</p>}
				</div>
				<Button text="Login" />
			</form>
			{/* <Link to="/Register">Register</Link> */}
		</div>
	);
}

export default Login;
