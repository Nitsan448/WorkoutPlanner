import { NavLink } from "react-router-dom";
import classes from "./NavigationHeader.module.css";
import { currentWorkoutActions } from "../../store/currentWorkout-slice";
import { useDispatch } from "react-redux";

const MainNavigation = () => {
	const dispatch = useDispatch();

	function resetCurrentWorkoutHandler() {
		dispatch(currentWorkoutActions.reset());
	}

	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink
							onClick={resetCurrentWorkoutHandler}
							end
							to="/workouts"
							className={(navData) => (navData.isActive ? classes.active : "")}>
							All Workouts
						</NavLink>
					</li>
					{/* <li>
						<NavLink to="/workouts/:0" className={(navData) => (navData.isActive ? classes.active : "")}>
							Current Workout
						</NavLink>
					</li> */}
				</ul>
			</nav>
		</header>
	);
};

export default MainNavigation;
