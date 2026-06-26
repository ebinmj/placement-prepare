const mongoose = require("mongoose");
const fs = require("fs");
const path = require("path");
require("dotenv").config();

const Question = require("../models/Question");

async function importQuestions() {
  await mongoose.connect(process.env.MONGO_URI, {
  dbName: "placement_hlp",
});

console.log("✅ Connected to MongoDB");

  const questions = JSON.parse(
    fs.readFileSync(
      path.join(__dirname, "../data/questions.json"),
      "utf8"
    )
  );

  await Question.deleteMany({});
  await Question.insertMany(questions);

  console.log("Questions imported successfully!");
  process.exit();
}

importQuestions().catch((err) => {
  console.error(err);
  process.exit(1);
});