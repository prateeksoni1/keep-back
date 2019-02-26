const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
const passport = require("passport");
const session = require("express-session");
const app = express();

const authRouter = require("./routes/auth");

app.use(bodyParser({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true
  })
);
app.use(
  session({
    secret: "riphumans",
    saveUninitialized: false,
    resave: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRouter);

mongoose
  .connect("mongodb://pro:abc123@ds163494.mlab.com:63494/todo-keep", {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("DB connected");
    app.listen(4444, () => {
      console.log("server started at http://localhost:4444");
    });
  });
