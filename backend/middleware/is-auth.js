const jsonWebToken = require("jsonwebtoken");

module.exports = (req, res, next) => {
	const token = req.cookies.token;
	if (!token) {
		throw new Error("Not authenticated");
	}

	let decodedToken;
	try {
		decodedToken = jsonWebToken.verify(token, process.env.JWT_SECRET);
	} catch (error) {
		console.log(error.message);
		throw error;
	}
	req.userId = +decodedToken.userId;
	next();
};
