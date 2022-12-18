import { Routes, Route, Navigate } from "react-router-dom";
import ViewWorkout from "./pages/ViewWorkout";
import Workouts from "./pages/Workouts";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import PlayWorkout from "./pages/PlayWorkout";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Navigate replace to="/workouts" />} />

				<Route path="/workouts" element={<Workouts />} />

				<Route path="/workouts/:workoutId" element={<ViewWorkout />} />

				<Route path="/workouts/:workoutId/playing" element={<PlayWorkout />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}

export default App;
