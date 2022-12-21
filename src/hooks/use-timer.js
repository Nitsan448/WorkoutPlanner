import { useEffect, useReducer, useState } from "react";

function useTimer(initialTime, timerFinishedHandler) {
	const [state, dispatchUpdateTime] = useReducer(timeReducer, initialTime);
	const [paused, setPaused] = useState(false);

	function timeReducer(state, action) {
		if (action.type === "tick") {
			if (state.seconds > 0) {
				return { minutes: state.minutes, seconds: state.seconds - 1 };
			} else if (state.minutes > 0) {
				return { minutes: state.minutes - 1, seconds: 59 };
			} else {
				timerFinishedHandler();
				return { minutes: state.minutes, seconds: state.seconds };
			}
		} else if (action.type === "set-time") {
			return { minutes: action.minutes, seconds: action.seconds };
		}
	}

	function setTime({ minutes, seconds }) {
		dispatchUpdateTime({ type: "set-time", minutes, seconds });
	}

	function togglePausedState() {
		setPaused((paused) => !paused);
	}

	useEffect(() => {
		const timerInterval = setInterval(() => {
			if (!paused) {
				dispatchUpdateTime({ type: "tick" });
			} else {
				clearInterval(timerInterval);
			}
		}, 1000 / 10);

		return () => clearInterval(timerInterval);
	}, [paused]);

	return {
		minutes: state.minutes,
		seconds: state.seconds,
		setTime,
		togglePausedState,
	};
}

export default useTimer;
