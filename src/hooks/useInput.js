import React, { useState } from "react";

function useInput(validateInput)
{
	const [eneteredValue, setEnteredValue] = useState('');
	const [inputTouched, setInputTouched] = useState(false);

	const valueIsValid = validateInput(eneteredValue);
	const hasError = !valueIsValid && inputTouched;

	function valueChangeHandler(event)
	{
		setEnteredValue(event.target.value);
	}

	function inputBlurHandler(event)
	{
		setInputTouched(true);
	}

	function reset()
	{
		setEnteredValue('');
		setInputTouched(false);
	}

	return (
		{
			value: eneteredValue,
			isValid: valueIsValid,
			hasError,
			valueChangeHandler,
			inputBlurHandler,
			reset,
		}
	);
}

export default useInput;