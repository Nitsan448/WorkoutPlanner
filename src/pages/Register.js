import React from "react";
import classes from "../components/Exercises/ExerciseForm.module.css";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../store/apiSlice";
import { useForm } from "react-hook-form";
import Button from "../components/UI/Button";

function Register(props) {
	const navigate = useNavigate();

	const [registerUser] = useRegisterMutation();

	async function registerHandler(data) {
		try {
			await registerUser({
				user_name: data.userName,
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
		getValues,
	} = useForm();

	return (
		<div className={classes.form}>
			<form onSubmit={handleSubmit(async (data) => await registerHandler(data))}>
				<div className={classes.form_group}>
					<label htmlFor="userName">User name:</label>
					<input type="text" {...register("userName", { required: true })} />
					{errors.userName && <p className={classes.invalid}>User name cannot be empty</p>}
				</div>
				<div className={classes.form_group}>
					<label htmlFor="email">Email:</label>
					<input type="text" {...register("email", { required: true, pattern: /\S+@\S+\.\S+/ })} />
					{errors.email && <p className={classes.invalid}>Email is not valid</p>}
				</div>
				<div className={classes.form_group}>
					<label htmlFor="password">password:</label>
					<input type="password" {...register("password", { required: true, minLength: 5 })} />
					{errors.password && <p className={classes.invalid}>Password must be longer than 4 characters</p>}
				</div>
				<div className={classes.form_group}>
					<label htmlFor="validatePassword">Validate password:</label>
					<input
						type="password"
						{...register("validatePassword", {
							required: true,
							validate: (value) => value === getValues("password"),
						})}
					/>
					{errors.validatePassword && <p className={classes.invalid}>Passwords must match</p>}
				</div>
				<Button text="Register" />
			</form>
			<Link to="/Login">Login</Link>
		</div>
	);
}

export default Register;
