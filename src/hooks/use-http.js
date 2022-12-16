// import { useReducer, useCallback } from "react";

// function useHttp(requestFunction, startWithPending = false) {
// 	//Set pending status if startwithpending is true

// 	const sendRequest = useCallback(async (requestConfig, applyData) => {
// 		//Set sending status

// 		try {
// 			const response = await fetch(requestConfig.url, {
// 				method: requestConfig.method ? requestConfig.method : "GET",
// 				headers: requestConfig.headers ? requestConfig.headers : {},
// 				body: JSON.stringify(requestConfig.body ? requestConfig.body : null),
// 			});
// 			if (!response.ok) {
// 				throw new Error("Request failed");
// 			}

// 			const data = await response.json();

// 			applyData(data);
// 		} catch (error) {
// 			throw new Error("Request failed");
// 		}

// 		//Send finished status
// 	}, []);

// 	return {
// 		sendRequest,
// 	};
// }

// export default useHttp;
