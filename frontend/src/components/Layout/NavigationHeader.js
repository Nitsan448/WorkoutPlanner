import classes from "./NavigationHeader.module.css";
import { useLogoutMutation } from "../../store/apiSlice";
import { useNavigate, useLocation, NavLink } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLoggedInState } from "../../store/userSlice";
import { setUnsavedChanges } from "../../store/uiSlice";
import Modal from "../UI/Modal";
import Button from "../UI/Button";

const NavigationHeader = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const location = useLocation();

	const [showUnsavedChangesModal, setShowUnsavedChangesModal] = useState(false);
	const [unsavedChangesModalnextPageUrl, setUnsavedChangesModalNextPageUrl] = useState();

	const myWorkoutButtonClasses =
		location.pathname === "/workouts" ? `${classes.active} ${classes.myWorkoutsButton}` : classes.myWorkoutsButton;

	const [logout] = useLogoutMutation();

	const loggedIn = useSelector((state) => state.user.loggedIn);
	const unsavedChanges = useSelector((state) => state.ui.unsavedChanges);

	function navigateToMainPage() {
		loggedIn ? attemptToNavigate("/workouts") : attemptToNavigate("/register");
	}

	useEffect(() => {
		if (document.cookie.indexOf("token=") !== -1) {
			dispatch(setLoggedInState(true));
		}
	}, [navigate, dispatch]);

	async function onLogoutClickHandler() {
		await logout();
		dispatch(setLoggedInState(false));
		attemptToNavigate("/login");
	}

	function attemptToNavigate(nextPageUrl) {
		if (unsavedChanges) {
			setUnsavedChangesModalNextPageUrl(nextPageUrl);
			setShowUnsavedChangesModal(true);
		} else {
			dispatch(setUnsavedChanges(false));
			navigate(nextPageUrl);
		}
	}

	return (
		<>
			<Modal
				title="Unsaved changes"
				message="You have unsaved changes, are you sure you want to leave this page?"
				showModal={showUnsavedChangesModal}>
				<Button
					whiteButton
					onClick={() => {
						navigate(unsavedChangesModalnextPageUrl);
						dispatch(setUnsavedChanges(false));
						setShowUnsavedChangesModal(false);
					}}
					text="Yes"
				/>
				<Button
					onClick={() => {
						setShowUnsavedChangesModal(false);
					}}
					text="No"
				/>
			</Modal>
			<header className={classes.header}>
				<button className={classes.logo} onClick={navigateToMainPage} />
				<nav className={classes.nav}>
					{loggedIn ? (
						<ul>
							<li>
								<button
									onClick={() => attemptToNavigate("/workouts")}
									className={myWorkoutButtonClasses}>
									My Workouts
								</button>
							</li>
							<li>
								<NavLink onClick={onLogoutClickHandler}>Log out</NavLink>
							</li>
						</ul>
					) : (
						<ul>
							<li>
								<NavLink
									to="/register"
									className={(navData) => (navData.isActive ? classes.active : "")}>
									Sign up
								</NavLink>
							</li>
							<li>
								<NavLink to="/login" className={(navData) => (navData.isActive ? classes.active : "")}>
									Log in
								</NavLink>
							</li>
						</ul>
					)}
				</nav>
			</header>
		</>
	);
};

export default NavigationHeader;
