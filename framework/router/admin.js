const express = require("express");

const admin = express.Router();

admin.get("/index", (req, res) => {
  res.send("Welcome to admin index...");
});

module.exports = admin;
