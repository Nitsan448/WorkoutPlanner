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

const corsOptions = {
	credentials: true,
	origin: true,
};
app.use(cors(corsOptions));

app.use(cookieParser());

app.use("/workouts", isAuth, workoutsRoutes);
app.use("/routines", isAuth, routinesRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 8000);
