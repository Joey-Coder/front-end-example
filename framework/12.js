const express = require("express");
const app = express();

app.get("/index/:id", (req, res) => {
  res.send(req.params);
});

app.listen(3000);
