// import classes from "./Layout.module.css";
import NavigationHeader from "./NavigationHeader";

const Layout = (props) => {
	return (
		<>
			<NavigationHeader />
			<main>{props.children}</main>
		</>
	);
};

export default Layout;
