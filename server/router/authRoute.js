import express from "express";
import passport from "passport";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
dotenv.config();
const authRouter = express.Router();

// Successful login route
authRouter.get("/login/success", (req, res) => {
 
  if (req.user) {
    const accessToken = jwt.sign({ user: req.user }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      user: req.user,
      accessToken: accessToken,
    });
  } else {
    res.status(401).json({
      message: "Not authorized",
    });
  }
});

// Failed login route
authRouter.get("/login/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User authentication failed.",
  });
});

// Google authentication route
authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google authentication callback routeD
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: process.env.CLIENT_URL,
  })
);

authRouter.get("/logout", (req, res) => {
  try {
    req.logout(); // Passport.js method to remove the user's session
    res.redirect("/"); // Redirect to home page or any other route
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default authRouter;
