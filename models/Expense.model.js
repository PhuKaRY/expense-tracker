const { Schema, model } = require("mongoose");

const expenseSchema = new Schema({
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: { type: String, enum: ["Must have", "Nice to have", "Wasted"] },
  tag: {
    type: mongoose.Schema.Types.ObjectId,
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
});

const Expense = model("Expense", expenseSchema);

module.exports = Expense;
