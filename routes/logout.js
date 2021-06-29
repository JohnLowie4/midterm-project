
const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

// GET /register

router.post("/", (req, res) => {
  res.redirect("/");
});

module.exports = router;
