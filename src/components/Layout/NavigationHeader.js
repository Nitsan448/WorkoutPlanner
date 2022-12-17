import { NavLink } from "react-router-dom";
import classes from "./NavigationHeader.module.css";
import { workoutActions } from "../../store/workout-slice";
import { useDispatch } from "react-redux";

const MainNavigation = () => {
	const dispatch = useDispatch();

	function resetworkoutHandler() {
		dispatch(workoutActions.reset());
	}

	return (
		<header className={classes.header}>
			<nav className={classes.nav}>
				<ul>
					<li>
						<NavLink
							onClick={resetworkoutHandler}
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
