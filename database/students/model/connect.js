const mongoose = require("mongoose");

mongoose.connect(
  "mongodb://localhost/playground",
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    !err && console.log("connect success...");
  }
);
