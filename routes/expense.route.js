const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense.model");

router.get("/", (req, res, next) => {
  res.render("index");
});

route.post("/", (req, res) => {});
