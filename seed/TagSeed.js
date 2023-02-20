require("dotenv").config({ path: "./../.env" });
require("./../db");
const Tag = require("./../models/Tag.model");

const tags = [
  { name: "food" },
  { name: "transport" },
  { name: "house" },
  { name: "shopping" },
  { name: "party" },
];
async function seed() {
  await Tag.deleteMany();
  await Tag.create(tags);
  process.exit();
}

seed();
