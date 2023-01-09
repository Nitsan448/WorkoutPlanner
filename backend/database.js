const mysql = require("mysql2");

const pool = mysql.createPool({
	host: "localhost",
	user: "root",
	database: "workout-planner",
	password: "Ni1475369",
});

module.exports = pool.promise();
