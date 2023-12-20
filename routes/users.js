const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { jwtSecretKey } = require("../config");
const { hashPassword, comparePasswords } = require("../utils/hash");

//user
const users = [];

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  // Check if username already exists
  if (users.find((user) => user.username === username)) {
    return res.status(400).json({ message: "Username already exists" });
  }

  // Hash the password before saving it
  const hashedPassword = await hashPassword(password);

  // Save user
  users.push({ username, password: hashedPassword });

  res.json({ message: "Registration successful" });
});

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  // Find the user by username
  const user = users.find((user) => user.username === username);

  // Check if the user exists
  if (!user) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Compare the provided password with the hashed password
  const isPasswordValid = comparePasswords(password, user.password);

  if (!isPasswordValid) {
    return res.status(401).json({ message: "Invalid username or password" });
  }

  // Generate a JWT token
  const token = jwt.sign({ username: user.username }, jwtSecretKey, {
    expiresIn: "1h",
  });

  res.json({ token });
});

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    res.json(req.user);
  }
);

module.exports = router;
