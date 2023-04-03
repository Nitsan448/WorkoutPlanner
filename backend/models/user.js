const database = require("../database");

module.exports = class User {
	static findById(userId) {
		const query = "SELECT * FROM users WHERE id=?";
		return database.execute(query, [userId]);
	}

	static findByEmail(email) {
		const query = "SELECT * FROM users WHERE email=?";
		return database.execute(query, [email]);
	}

	static findByUserName(userName) {
		const query = "SELECT * FROM users WHERE user_name=?";
		return database.execute(query, [userName]);
	}

	static findByEmailOrUserName(emailOrUserName) {
		const query = "SELECT * FROM users WHERE email=? OR user_name=?";
		return database.execute(query, [emailOrUserName, emailOrUserName]);
	}

	static register(user) {
		const query = "INSERT INTO users (user_name ,email, password) VALUES (?, ?, ?)";
		return database.execute(query, [user.userName, user.email, user.password]);
	}

	static deleteUser(userId) {
		const query = "DELETE FROM users WHERE user_id=?";
		return database.execute(query, [userId]);
	}
};
