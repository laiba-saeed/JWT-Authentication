const bcrypt = require("bcrypt");
const passport = require("passport");

const hashPassword = async (passport) => {
  const saltRounds = 10;
  return bcrypt.hash(passport, saltRounds);
};

const comparePasswords = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};

module.exports = {
  hashPassword,
  comparePasswords,
};
