const express = require("express");
const workoutsRoutes = require("./routes/workouts");
const routinesRoutes = require("./routes/routines");
const authRoutes = require("./routes/auth");
const isAuth = require("./middleware/is-auth");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const multer = require("multer");
const { multerSettings } = require("./helpers/fileManagement");
const corsOptions = require("./helpers/cors");

const app = express();

app.use(express.json());
app.use(multer(multerSettings).any());
app.use(cors(corsOptions));
app.use(cookieParser());

app.use("/workouts", isAuth, workoutsRoutes);
app.use("/routines", isAuth, routinesRoutes);
app.use("/auth", authRoutes);

app.listen(process.env.PORT || 8000);
