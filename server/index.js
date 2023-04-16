import express from "express";
import bodyParser from "body-parser";
import { askToOpenAi } from "./utils/openai.js";
import imageDetection from "./utils/imageDetection.js";
import { checkSymptoms } from "./controller/checkSymptoms.js";
import diagnosis from "./utils/diagnosis.js";
import cors from "cors";
import suggest from "./utils/suggest.js";
import passport from "passport";
import dotenv from "dotenv";
import authRouter from "./router/authRoute.js";
import session from "express-session";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
dotenv.config();
import jwt from "jsonwebtoken";
import "./config/passport.js";
import db from "./config/db.js";
import { infermedicaApiMiddleware } from "./api/InfermedicaApi.js";
import infermedicaRouter from "./router/infermedicaRouter.js";
db();

const app = express();
const port = 5000;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan("dev"));
app.use(helmet());
app.use(passport.initialize());
app.use(passport.session());

const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (authHeader) {
    const token = authHeader.split(" ")[1];
    console.log(token);
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user;
      next();
    });
  } else {
    res.sendStatus(401);
  }
};

app.get("/", (req, res) => {});
app.use("/auth", authRouter);
app.get("/checkLogin", authenticateJWT, (req, res) => {
  res.json({ loggedIn: true });
});

app.post("/basicquery", askToOpenAi);
app.post("/symptomchecker", checkSymptoms);
app.post("/imagedetection", imageDetection);
app.use("/infermedica", infermedicaRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
