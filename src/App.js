import classes from "./App.module.css";
import Exercise from "./components/Exercise";
import ExerciseForm from "./components/ExerciseForm";

function App() {
	return (
		<div className={classes.App}>
			<ExerciseForm></ExerciseForm>
			<Exercise
				name="Swings"
				repetitions="10"
				restTime="0:10"
				description="Two handed swings"></Exercise>
		</div>
	);
}

export default App;
