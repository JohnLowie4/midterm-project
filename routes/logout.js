
const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

// GET /register

router.post("/", (req, res) => {
  req.session = null;
  res.redirect("/login");
});

module.exports = router;
