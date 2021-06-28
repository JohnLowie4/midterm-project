
const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

// GET /register

router.get("/", (req, res) => {
  res.render("register");
});

module.exports = router;
