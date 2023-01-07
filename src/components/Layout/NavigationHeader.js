import { NavLink } from "react-router-dom";
import classes from "./NavigationHeader.module.css";
import Button from "../UI/Button";
import { useLogoutMutation } from "../../store/apiSlice";
import { useNavigate } from "react-router-dom";
import React from "react";

const MainNavigation = () => {
	const [logout] = useLogoutMutation();
	const navigate = useNavigate();

	async function onLogoutClickHandler() {
		await logout();
		navigate("/login");
	}

	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink end to="/workouts" className={(navData) => (navData.isActive ? classes.active : "")}>
							All Workouts
						</NavLink>
					</li>
					<li>
						<Button text="Logout" onClick={onLogoutClickHandler} />
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
