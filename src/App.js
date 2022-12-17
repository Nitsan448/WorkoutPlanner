import { Routes, Route, Navigate } from "react-router-dom";
import ViewCurrentWorkout from "./pages/viewWorkout";
import Workouts from "./pages/Workouts";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout/Layout";
import CurrentWorkoutPlaying from "./pages/playWorkout";

function App() {
	return (
		<Layout>
			<Routes>
				<Route path="/" element={<Navigate replace to="/workouts" />} />

				<Route path="/workouts" element={<Workouts />} />

				<Route path="/workouts/:workoutId" element={<ViewCurrentWorkout />} />

				<Route path="/workouts/:workoutId/playing" element={<CurrentWorkoutPlaying />} />

				<Route path="*" element={<NotFound />} />
			</Routes>
		</Layout>
	);
}

export default App;
