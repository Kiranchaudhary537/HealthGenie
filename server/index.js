import express from "express";
import bodyParser from "body-parser";
import { askToOpenAi } from "./utils/openai.js";

import { checkSymptoms } from "./controller/checkSymptoms.js";
import cors from "cors";
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

import infermedicaRouter from "./router/infermedicaRouter.js";
db();

const app = express();
const port = process.env.PORT;

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(
  cors({
    origin: process.env.CLIENT_URL,
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

// verifing jwt token
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
  
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

app.get("/api/", (req, res) => {
  res.json("server working");
});

app.use("/api/auth", authRouter);
app.get("/api/checkLogin", authenticateJWT, (req, res) => {
  res.json({ loggedIn: true });
});

app.post("/api/basicquery", authenticateJWT, askToOpenAi);
app.post("/api/symptomchecker", authenticateJWT, checkSymptoms);

// app.post("/imagedetection",imageDetection);
app.use("/api/infermedica", authenticateJWT, infermedicaRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
