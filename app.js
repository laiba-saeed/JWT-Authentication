const express = require("express");
const bodyParser = require("body-parser");
const passport = require("passport");
const usersRoutes = require("./routes/users");
const { initializePassport } = require("./middlewares/auth");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Initialize passport
initializePassport(passport);
app.use(passport.initialize());

//Import user routes
app.use("/users", usersRoutes);

module.exports = app;
