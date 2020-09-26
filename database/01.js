const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/test", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connect success");
  })
  .catch((err) => console.log("connect error!", err));
