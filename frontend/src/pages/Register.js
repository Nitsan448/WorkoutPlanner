import React, { useEffect } from "react";
import classes from "./RegisterAndLogin.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../store/apiSlice";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";
import { useDispatch } from "react-redux";
import { showModal } from "../store/errorModalSlice";
import { setLoggedInState } from "../store/userSlice";

function Register(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		if (document.cookie.indexOf("token=") !== -1) {
			dispatch(setLoggedInState(true));
			navigate(`/workouts`);
		}
	}, [navigate, dispatch]);

	const [registerUser] = useRegisterMutation();

	async function registerHandler(data) {
		try {
			await registerUser({
				user_name: data.userName,
				email: data.email,
				password: data.password,
			}).unwrap();
			clearErrors();
			dispatch(setLoggedInState(true));
			navigate(`/workouts`);
		} catch (error) {
			if (error.data === "User name taken") {
				setError("userName", { message: error.data });
			} else if (error.data === "Email address already exists") {
				setError("email", { message: error.data });
			} else if (error.data === "Password must be longer then 5 characters") {
				setError("password", { message: error.data });
			} else {
				dispatch(showModal(error.data));
			}
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
		getValues,
		setError,
		clearErrors,
	} = useForm();

	return (
		<div className={classes.container}>
			<h1>Sign up</h1>
			<div className={classes.form}>
				<form onSubmit={handleSubmit(async (data) => await registerHandler(data))}>
					<div>
						<label htmlFor="userName">User name:</label>
						<input type="text" {...register("userName", { required: "Please enter your user name" })} />
						{errors.userName && <p className={"invalidParagraph"}>{errors.userName.message}</p>}
					</div>
					<div>
						<label htmlFor="email">Email:</label>
						<input
							type="text"
							{...register("email", {
								required: "Please enter your email",
								pattern: { value: /\S+@\S+\.\S+/, message: "Please enter a valid email" },
							})}
						/>
						{errors.email && <p className={"invalidParagraph"}>{errors.email.message}</p>}
					</div>
					<div>
						<label htmlFor="password">password:</label>
						<input
							type="password"
							{...register("password", {
								required: "Please enter a password",
								minLength: { value: 5, message: "Password must be longer than 4 characters" },
							})}
						/>
						{errors.password && <p className={"invalidParagraph"}>{errors.password.message}</p>}
					</div>
					<div>
						<label htmlFor="validatePassword">Validate password:</label>
						<input
							type="password"
							{...register("validatePassword", {
								required: "Please enter your password again",
								validate: (value) => value === getValues("password") || "Passwords do not match",
							})}
						/>
						{errors.validatePassword && (
							<p className={"invalidParagraph"}>{errors.validatePassword.message}</p>
						)}
					</div>
					<Button text="Sign up" />
				</form>
			</div>
			<Link className={classes.link} to="/Login">
				Already have an account? Click here!
			</Link>
		</div>
	);
}

export default Register;
