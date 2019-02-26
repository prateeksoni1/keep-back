const passport = require("passport");
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy;

const User = require("./models/userModel");

passport.serializeUser((user, done) => {
  return done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      if (!user) {
        return done(new Error("No User"), null);
      }
      return done(null, user);
    })
    .catch(err => {
      return done(err, null);
    });
});

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    (email, password, done) => {
      console.log(email, password);
      User.findOne({ email })
        .then(user => {
          console.log(user.password);
          if (bcrypt.compare(password, user.password)) {
            return done(null, user);
          } else {
            return done(null, false);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  )
);

module.exports = passport;
