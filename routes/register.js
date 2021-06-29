
const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

// GET /register

router.get("/", (req, res) => {
  const templateVars = {user_email: req.session.user_email};
  res.render("register", templateVars);
});

module.exports = router;
