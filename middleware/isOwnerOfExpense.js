const Expense = require("../models/Expense.model");

module.exports = async (req, res, next) => {
  const { id } = req.params;
  const currentExpense = await Expense.findById(id);
  // req.session.currentUser.id
  if (
    req.session.currentUser &&
    currentExpense.user.toString() === req.session.currentUser._id.toString()
  ) {
    return next();
  }
  res.redirect("/");
};
