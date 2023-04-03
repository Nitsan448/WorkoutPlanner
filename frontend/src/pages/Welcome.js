import React from "react";
import classes from "./RegisterAndLogin.module.css";
import welcomeImage from "../images/welcome.svg";
import { useNavigate, Link } from "react-router-dom";
import { useRegisterMutation } from "../store/apiSlice";
import { useDispatch } from "react-redux";
import { showErrorModal } from "../store/uiSlice";
import { setLoggedInState } from "../store/userSlice";

function Welcome(props) {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [registerUser] = useRegisterMutation();

	async function registerGuest() {
		const userNameAndPassword = Math.random().toString(36);
		try {
			await registerUser({
				user_name: userNameAndPassword,
				email: `${userNameAndPassword}@gmail.com`,
				password: userNameAndPassword,
				isGuest: true,
			}).unwrap();
			dispatch(setLoggedInState(true));
			navigate(`/workouts`);
		} catch (error) {
			dispatch(showErrorModal(error.data));
		}
	}

	return (
		<div className="mainContainer">
			<div className={classes.container}>
				<img src={welcomeImage} className={classes.welcomeImage} alt="Welcome"></img>
				<div className={classes.welcome}>
					<h1>
						To save your progress <br /> you will need an account
					</h1>
					<div className={classes.welcomeButtons}>
						<button onClick={() => navigate("/register")} className={classes.createAccountButton}>
							Create an account
						</button>
						<button className={classes.continueAsGuestButton} onClick={registerGuest}>
							Continue as guest
						</button>
					</div>
				</div>
				<Link className={classes.link} to="/Login">
					Already have an account? Click here!
				</Link>
			</div>
		</div>
	);
}

export default Welcome;
