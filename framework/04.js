const express = require("express");

const app = express();

// app.use((req, res, next) => {
//   console.log("website is pausing...");
//   res.send('404')
// });

app.use("/admin", (req, res, next) => {
  let isLogin = false;
  //   let isLogin = true;
  if (isLogin) {
    next();
  } else {
    res.send("you were not login..");
  }
});

app.get("/admin", (req, res) => {
  res.send("you were login...");
});

app.use((req, res, next) => {
  res.send("page isn't exist");
});

app.listen(3000);

console.log("Website start...");
