import { useEffect, useReducer } from "react";

function useTimer(initialTime, timerFinishedHandler) {
	const [state, dispatchUpdateTimerState] = useReducer(timerReducer, initialTime);

	function timerReducer(state, action) {
		if (action.type === "tick") {
			if (state.seconds > 0) {
				return { minutes: state.minutes, seconds: state.seconds - 1 };
			} else if (state.minutes > 0) {
				return { minutes: state.minutes - 1, seconds: 59 };
			} else {
				timerFinishedHandler();
				return { minutes: state.minutes, seconds: state.seconds };
			}
		} else if (action.type === "set-timer-time") {
			return { minutes: action.minutes, seconds: action.seconds };
		}
	}

	function setTimerTime({ minutes, seconds }) {
		dispatchUpdateTimerState({ type: "set-timer-time", minutes, seconds });
	}

	useEffect(() => {
		const timerInterval = setInterval(() => {
			dispatchUpdateTimerState({ type: "tick" });
		}, 1000 / 40);

		return () => clearInterval(timerInterval);
	}, []);

	return {
		minutes: state.minutes,
		seconds: state.seconds,
		setTimerTime,
	};
}

export default useTimer;
