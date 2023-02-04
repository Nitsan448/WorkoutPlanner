const mysql = require("mysql2");

const pool = mysql.createPool({
	host: process.env.RDS_HOSTNAME || process.env.DB_HOST,
	user: process.env.RDS_USERNAME || process.env.DB_USER,
	password: process.env.RDS_PASSWORD || process.env.DB_PASSWORD,
	port: process.env.RDS_PORT,
	database: process.env.RDS_DB_NAME || process.env.DB,
});

module.exports = pool.promise();
