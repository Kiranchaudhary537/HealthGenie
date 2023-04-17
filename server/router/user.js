const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();

const UserModel = require("../models/UserModel");
const userrouter = express.Router();

const userAll = async (req, res) => {
  //   UserModel.find()
  //     .then((e) => {
  //       res.status(200).send({ message: e });
  //     })
  //     .catch(res.status(400).send("Error"));

  res.cookie("jwt", "token", { httpOnly: false });
  res.status(200).send("ok");
};

userrouter.route("/").get(userAll);
module.exports = userrouter;
