const express = require("express");

const app = express();

app.use((req, res, next) => {
  console.log("all request");
  next();
});
app.get("/request", (req, res, next) => {
  req.name = "Joey";
  next();
});

app.use("/request", (req, res, next) => {
  console.log("using use middleware");
  next();
});

app.get("/request", (req, res) => {
  res.send(req.name);
});

app.listen(3000);

console.log("Website start...");
