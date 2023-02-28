const whitelist = ["http://localhost:3000", "https://www.workoutscreator.com"];
const corsOptions = {
	origin: function (origin, callback) {
		if (whitelist.indexOf(origin) !== -1 || !origin) {
			callback(null, true);
		} else {
			callback(new Error("Not allowed by CORS"));
		}
	},
	credentials: true,
	methods: "GET,PUT,DELETE,HEAD,POST,PATCH",
	allowdHeaders: "Content-Type",
};

module.exports = corsOptions;
