// import classes from "./Layout.module.css";
import { Outlet } from "react-router-dom";
import NavigationHeader from "../components/Layout/NavigationHeader";

const Layout = (props) => {
	return (
		<>
			<NavigationHeader />
			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Layout;
