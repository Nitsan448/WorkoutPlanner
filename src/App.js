import { Routes, Route, Navigate } from "react-router-dom";
import Workout from "./pages/Workout";
import Workouts from "./pages/Workouts";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import Register from "./pages/Register";
import Login from "./pages/Login";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Navigate replace to="/register" />} />

				<Route path="/register" element={<Register />} />

				<Route path="/login" element={<Login />} />

				<Route path="/workouts" element={<Workouts />} />

				<Route path="/workouts/:workoutId" element={<Workout />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}

export default App;
