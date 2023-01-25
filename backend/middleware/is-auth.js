const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		throw new Error("Not authenticated");
	}

	//TODO: change secret and put it in process.env
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
