const express = require("express");

const app = express();

app.get("/index", (req, res) => {
  res.send("Welcome");
  console.log(req.query)
});

app.listen(3000);
