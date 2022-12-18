import React, { useEffect, useState } from "react";

function useTimer(initialTime, onTimerFinished) {
	const [minutes, setMinutes] = useState(initialTime[0]);
	const [seconds, setSeconds] = useState(initialTime[1]);

	useEffect(() => {
		setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else if (minutes > 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				onTimerFinished();
			}
		}, 1000 / 100); //TODO: Remove /10
	}, [seconds, minutes]);

	return {
		minutes,
		seconds,
		setMinutes,
		setSeconds,
	};
}

export default useTimer;
