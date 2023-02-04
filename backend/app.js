const express = require("express");
const workoutsRoutes = require("./routes/workouts");
const routinesRoutes = require("./routes/routines");
const authRoutes = require("./routes/auth");
const isAuth = require("./middleware/is-auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const path = require("path");

const app = express();

const fileStorage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, "images");
	},
	filename: (req, file, cb) => {
		cb(null, new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname);
	},
});

const fileFilter = (req, file, cb) => {
	if (file.mimetype === "image/png" || file.mimetype === "image/jpeg" || file.mimetype === "image/jpg") {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

app.use(express.json());
app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).any());
app.use("/images", express.static(path.join(__dirname, "images")));

const whitelist = [
	"http://localhost:3000",
	"https://main.d2r6jbd1qycb1j.amplifyapp.com/MyWebAppEnvironment.eba-8zsnz3f3.eu-west-3.elasticbeanstalk.com",
	"https://main.d2r6jbd1qycb1j.amplifyapp.com",
	"MyWebAppEnvironment.eba-8zsnz3f3.eu-west-3.elasticbeanstalk.com",
];

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
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/workouts", isAuth, workoutsRoutes);
app.use("/routines", isAuth, routinesRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 8000);
