//file for handling login route

const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

// GET /login
router.get('/', (req, res) => {
  const templateVars = { user_id: req.session.user_id};
  res.render("login", templateVars);
})

// GET /login/:id

//post /login


module.exports = router;
