const express = require("express");
const fs = require("fs");
const promisify = require("util").promisify;
const readFile = promisify(fs.readFile);

const app = express();

app.get("/index", (req, res) => {
  throw new Error("something error");
});

app.get("/read", async (req, res, next) => {
  try {
    await readFile("./notexist.txt");
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000);
