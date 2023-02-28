import React from "react";
import classes from "./RegisterAndLogin.module.css";
import Button from "../components/UI/Button";
import { useNavigate, Link } from "react-router-dom";
import { useLoginMutation } from "../store/apiSlice";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { setLoggedInState } from "../store/userSlice";
import { showErrorModal } from "../store/modalSlice";

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
			} else {
				dispatch(showErrorModal(error.data));
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
		<div className={classes.container}>
			<h1>Log in</h1>
			<div className={classes.form}>
				<form onSubmit={handleSubmit(async (data) => await loginHandler(data))}>
					<div>
						<label htmlFor="emailOrUserName">Email/User name:</label>
						<input
							type="text"
							{...register("emailOrUserName", {
								required: "Please enter your Email or user name",
							})}
						/>
						{errors.emailOrUserName && (
							<p className={"invalidParagraph"}>{errors.emailOrUserName.message}</p>
						)}
					</div>
					<div>
						<label htmlFor="password">Password:</label>
						<input
							type="password"
							{...register("password", {
								required: "Please enter your password",
								minLength: {
									value: 5,
									message: "Password is not valid",
								},
							})}
						/>
						{errors.password && <p className={"invalidParagraph"}>{errors.password.message}</p>}
					</div>
					<Button text="Log in" />
				</form>
				{/* <Link to="/Register">Register</Link> */}
			</div>
			<Link className={classes.link} to="/Register">
				Don't have an account? Click here!
			</Link>
		</div>
	);
}

export default Login;
