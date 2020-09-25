const express = require("express");
const fs = require("fs");

const app = express();

app.get("/index", (req, res) => {
  throw new Error("something error");
});

app.get("/read", (req, res, next) => {
  fs.readFile("./not.txt", "utf-8", (err, result) => {
    if (err != null) {
      next(err);
    } else {
      res.send(result);
    }
  });
});

app.use((err, req, res, next) => {
  res.status(500).send(err.message);
});

app.listen(3000);
