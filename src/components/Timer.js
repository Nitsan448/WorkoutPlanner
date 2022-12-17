import React, { useEffect, useState } from "react";
import classes from "./Timer.module.css";

function Timer(props) {
	const { initialMinutes = 0, initialSeconds = 0 } = props;
	const [minutes, setMinutes] = useState(initialMinutes);
	const [seconds, setSeconds] = useState(initialSeconds);

	useEffect(() => {
		const interval = setTimeout(() => {
			if (seconds > 0) {
				setSeconds(seconds - 1);
			} else if (minutes > 0) {
				setMinutes(minutes - 1);
				setSeconds(59);
			} else {
				clearInterval(interval);
			}
			return () => {
				clearInterval(interval);
			};
		}, 1000);
	}, []);

	return (
		<div>
			{minutes === 0 && seconds === 0 ? null : (
				<h1>
					{" "}
					{minutes}:{seconds < 10 ? `0${seconds}` : seconds}
				</h1>
			)}
		</div>
	);
}

export default Timer;
