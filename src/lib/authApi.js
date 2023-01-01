const SERVERURL = "http://localhost:8000/";

export async function registerRequest(user) {
	const response = await fetch(`${SERVERURL}auth/register`, {
		method: "POST",
		body: JSON.stringify({
			user_name: user.userName,
			email: user.email,
			password: user.password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
	});
	if (!response.ok) {
		throw new Error("Could not register");
	}
	return response.json();
}

export async function loginRequest(user) {
	const response = await fetch(`${SERVERURL}auth/login`, {
		method: "POST",
		body: JSON.stringify({
			email: user.email,
			password: user.password,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	});
	if (!response.ok) {
		throw new Error("Could not login");
	}
	return response.json();
}
