import React from "react";
import classes from "../components/Exercises/ExerciseForm.module.css";
import Button from "../components/UI/Button";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/apiSlice";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

function Login(props) {
	const navigate = useNavigate();

	const [login] = useLoginMutation();

	async function loginHandler(data) {
		try {
			login({
				email: data.email,
				password: data.password,
			});
			navigate(`/workouts`);
		} catch (error) {
			console.log(error);
		}
	}

	const {
		register,
		formState: { errors },
		handleSubmit,
	} = useForm();

	return (
		<div className={classes.form}>
			<form onSubmit={handleSubmit(async (data) => await loginHandler(data))}>
				<div className={classes.form_group}>
					<label htmlFor="email">Email:</label>
					<input type="text" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
					{errors.email && <p className={classes.invalid}>Email is not valid</p>}
				</div>
				<div className={classes.form_group}>
					<label htmlFor="password">Password:</label>
					<input type="password" {...register("password", { required: true, minLength: 5 })} />
					{errors.password && <p className={classes.invalid}>Password is not valid</p>}
				</div>
				<Button text="Login" />
			</form>
			<Link to="/Register">Register</Link>
		</div>
	);
}

export default Login;
