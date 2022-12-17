function getTimeInSeconds(time) {
	const [minutesString, secondsString] = time.split(":");

	const minutes = Number(minutesString);
	const seconds = Number(secondsString);
	return minutes * 60 + seconds;
}

function getTimeInSetFormat(timeInSeconds) {
	const minutes = Math.floor(timeInSeconds / 60);
	const seconds = timeInSeconds % 60;

	let minutesString = minutes.toString();
	let secondsString = seconds.toString();
	if (minutes < 10) {
		minutesString = `0${minutes}`;
	}
	if (seconds < 10) {
		secondsString = `0${seconds}`;
	}
	return minutesString + ":" + secondsString;
}

export { getTimeInSeconds, getTimeInSetFormat };
