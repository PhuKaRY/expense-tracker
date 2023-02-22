const express = require("express");
const router = express.Router();

const User = require("../models/User.model");

const isLoggedIn = require("../middleware/isLoggedIn");

router.get("/", (req, res, next) => {
  res.render("userProfile");
});

router.post("/:id", async (req, res, next) => {
  const { id } = req.params;
  const userEdit = { ...req.body };
  try {
    await User.findByIdAndUpdate(id, userEdit);
    res.redirect("/");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
