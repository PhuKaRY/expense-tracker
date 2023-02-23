const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

// How many rounds should bcrypt run the salt (default - 10 rounds)
const saltRounds = 10;


const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", async (req, res, next) => {
  const userFound = await User.findById(req.session.currentUser._id);
  console.log("the current user", userFound);
  res.render("userProfile", { userFound });
});

router.post("/", async (req, res, next) => {
  const userEdit = { ...req.body };
  try {
    await User.findByIdAndUpdate(req.session.currentUser._id, userEdit);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
