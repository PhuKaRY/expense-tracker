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
      user: req.session.currentUser._id,
    });
    res.redirect("/main/expense-create");
  } catch (error) {
    next(error);
  }
});

router.get("/expense-create", async (req, res, next) => {
  try {
    const expenseUser = await Expense.find({
      user: req.session.currentUser._id,
    }).populate("tag");
    res.render("expense", { expense: expenseUser });
  } catch (error) {
    next(error);
  }
  // res
  //   .status(200)
  //   .render("expense-create", { message: "the data expense created" });
});

router.post("/expense-create/:id", async (req, res, next) => {
  // try {
  //   const { id } = req.params;
  //   const newExpense = { ...req.body };
  //   await Expense.findById(id);
  //   res.json({ message: `successfully created expense:${id}` });
  // } catch (error) {
  //   next(error);
  // }
});

module.exports = router;
