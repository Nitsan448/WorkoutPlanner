const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	//TODO: refactor
	const token = req.cookies.token;
	if (!token) {
		throw new Error("Not authenticated");
	}

	//TODO: put secret in process.env (research)
	let decodedToken;
	try {
		decodedToken = jsonWebToken.verify(token, "secret");
	} catch (error) {
		console.log(error.message);
		throw error;
	}
	req.userId = +decodedToken.userId;
	next();
};
