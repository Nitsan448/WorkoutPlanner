const {
	validate,
	validateEmailOnRegister,
	validatePasswordOnRegister,
	validateUserNameDoesNotExist,
} = require("../middleware/validation");
const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const jsonWebToken = require("jsonwebtoken");

const router = express.Router();

router.post(
	"/register",
	validateUserNameDoesNotExist(),
	validateEmailOnRegister(),
	validatePasswordOnRegister(),
	validate,
	async (req, res, next) => {
		try {
			const encryptedPassword = await bcrypt.hash(req.body.password, 12);
			const [results] = await User.register({
				userName: req.body.user_name,
				email: req.body.email,
				password: encryptedPassword,
			});
			const userId = results.insertId.toString();
			const userData = { email: req.body.email, userId };
			const token = setUserToken(res, userData);

			res.status(200).json({ token, userId: userData.userId });
		} catch (error) {
			console.log(error.message);
			res.status(500).json(error.message);
		}
	}
);

function setUserToken(res, userData) {
	//TODO: change secret and put it in process.env
	const token = jsonWebToken.sign(userData, "secret");
	const now = new Date();
	const tokenExpiryDate = new Date(now.getFullYear(), now.getMonth() + 1, 1);

	res.cookie("token", token, {
		path: "/",
		expires: tokenExpiryDate,
	});

	return token;
}

router.post("/login", async (req, res, next) => {
	try {
		let [user] = await User.findByEmailOrUserName(req.body.email_or_user_name);
		if (user.length === 0) {
			throw new Error("User could not be found");
		}
		const loadedUser = user[0];
		const isPasswordValid = await bcrypt.compare(req.body.password, loadedUser.password);
		console.log(isPasswordValid);
		if (!isPasswordValid) {
			throw new Error("Wrong password");
		}

		const userData = { email: loadedUser.email, userId: loadedUser.user_id.toString() };
		const token = setUserToken(res, userData);

		res.status(200).json({ token, userId: userData.userId });
	} catch (error) {
		console.log(error.message);
		res.status(500).json(error.message);
	}
});

router.post("/logout", async (req, res, next) => {
	res.clearCookie("token");
	res.sendStatus(200);
});

module.exports = router;
