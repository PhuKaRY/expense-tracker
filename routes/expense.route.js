const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense.model");
const Tag = require("../models/Tag.model");

router.get("/", async (req, res, next) => {
  const tags = await Tag.find();
  res.render("main", { tags });
});

router.post("/", async (req, res, next) => {
  const { date, price, category, tag } = req.body;
  try {
    await Expense.create({
      date,
      price,
      category,
      tag,
    });
    res.redirect("/main/expense-create");
  } catch (error) {
    next(error);
  }
});

router.get("/expense-create", (req, res, next) => {
  res.send("expense create");
});

module.exports = router;
