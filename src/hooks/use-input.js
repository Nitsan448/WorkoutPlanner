import { useState } from "react";

function useInput(validateInput, initialValue = "") {
	const [eneteredValue, setEnteredValue] = useState(initialValue);
	const [inputTouched, setInputTouched] = useState(false);

	const valueIsValid = validateInput(eneteredValue);
	const hasError = !valueIsValid && inputTouched;

	function valueChangeHandler(event) {
		setEnteredValue(event.target.value);
	}

	function inputBlurHandler(event) {
		setInputTouched(true);
	}

	function reset() {
		setEnteredValue(initialValue);
		setInputTouched(false);
	}

	return {
		value: eneteredValue,
		isValid: valueIsValid,
		hasError,
		valueChangeHandler,
		inputBlurHandler,
		reset,
	};
}

export default useInput;
