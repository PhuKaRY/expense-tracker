const express = require("express");
const router = express.Router();

const Expense = require("../models/Expense.model");
const { events } = require("../models/Tag.model");
const Tag = require("../models/Tag.model");

router.get("/expense/create", async (req, res, next) => {
  const tags = await Tag.find();
  res.render("expense-create", { tags });
});

router.post("/expense/create", async (req, res, next) => {
  const { date, price, category, tag } = req.body;
  try {
    await Expense.create({
      date,
      price,
      category,
      tag,
      user: req.session.currentUser._id,
    });
    res.redirect("/main");
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  try {
    const expenseUser = await Expense.find({
      user: req.session.currentUser._id,
    }).populate("tag");

    const total = expenseUser.reduce((sum, current) => {
      return sum + current.price || 0;
    }, 0);

    res.render("expense", { expense: expenseUser, total });
  } catch (error) {
    next(error);
  }
});

router.get("/expense-edit/:id", async (req, res, next) => {
  try {
    const tags = await Tag.find();
    const expenseEdit = await Expense.findById(req.params.id).populate("tag");
    res.render("expense-edit", { expenseEdit, tags });
  } catch (error) {
    next(error);
  }
});

router.post("/expense-edit/:id", async (req, res, next) => {
  const { id } = req.params;
  const expenseNew = { ...req.body };
  try {
    const expenseUpdate = await Expense.findByIdAndUpdate(id, expenseNew);
    console.log(expenseUpdate);
    res.redirect("/main");
  } catch (error) {
    next(error);
  }
});

router.post("/expense-delete/:id", async (req, res, next) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.redirect("/main");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
