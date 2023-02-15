import { NavLink } from "react-router-dom";
import classes from "./NavigationHeader.module.css";
import { useLogoutMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInState } from "../../store/userSlice";

const NavigationHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const [logout] = useLogoutMutation();

	const loggedIn = useSelector((state) => state.user.loggedIn);

	async function onLogoutClickHandler() {
		await logout();
		dispatch(setLoggedInState(false));
		navigate("/login");
	}

	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				{loggedIn ? (
					<ul>
						<li>
							<NavLink
								end
								to="/workouts"
								className={(navData) => (navData.isActive ? classes.active : "")}>
								All Workouts
							</NavLink>
						</li>
						<li>
							<NavLink onClick={onLogoutClickHandler}>Logout</NavLink>
						</li>
					</ul>
				) : (
					<ul>
						<li>
							<NavLink
								end
								to="/register"
								className={(navData) => (navData.isActive ? classes.active : "")}>
								Register
							</NavLink>
						</li>
						<li>
							<NavLink end to="/login" className={(navData) => (navData.isActive ? classes.active : "")}>
								Login
							</NavLink>
						</li>
					</ul>
				)}
			</nav>
		</header>
	);
};

export default NavigationHeader;
