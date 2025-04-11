import fs from 'fs';
import path from 'path';
import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";

const jsonPath = path.resolve('dist', 'seeds', 'pythonQuestions.json');
const pythonQuestions = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));

db.once('open', async () => {
  await cleanDB('Question', 'questions');
  await Question.insertMany(pythonQuestions);

  console.log('Questions seeded!');
  process.exit(0);
});
