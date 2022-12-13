import classes from "./App.module.css";
import ExerciseForm from "./components/ExerciseForm";

function App()
{
	return (
		<div className={classes.App}>
			<ExerciseForm></ExerciseForm>
		</div>
	);
}

export default App;
