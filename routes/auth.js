const route = require("express").Router();
const bcrypt = require("bcryptjs");

const User = require("../models/userModel");
const passport = require("../passport");

route.post("/signup", (req, res) => {
  //   console.log(req.body);
  const name = req.body.fullName;
  const email = req.body.email;
  const password = req.body.password;

  const hashedPassword = bcrypt.hashSync(password, 12);

  User.create({
    name,
    email,
    password: hashedPassword
  })
    .then(user => {
      console.log(user);
      res.send(user);
    })
    .catch(err => {
      console.log(err);
    });
});

route.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      return res.send({ success: false });
    }

    if (!user) {
      return res.send({
        success: false,
        message: "No User found"
      });
    }

    req.logIn(user, err => {
      if (err) {
        return res.send({ success: false });
      }
      return res.send({ success: true, user: user });
    });
  })(req, res, next);
});

module.exports = route;
