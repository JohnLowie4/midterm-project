
const express = require("express");
const router = express.Router();
const {
  pool,
  getUserByEmail,
  getAll,
  getAllActive,
  getAllArchive,
  getAllItemCategory,
  getActiveCategory,
  getArchivedCategory,
  addToDoList,
  updateToDoList,
  deleteToDoList,
  addNewUser
} = require('../database/database')

// GET /register

router.get("/", (req, res) => {
  const templateVars = {user_email: req.session.user_email};
  res.render("register", templateVars);
});
router.post("/", (req, res) => {
  //hash the incoming password
  const password = req.body.password;
  const email = req.body.email;
  //check if both fields have data
  if (email.length === 0 || req.body.password.length === 0) {
    return res.status(400).send("oops u forgot to fill in one of the fields");
  }
  //check f the email already exists
  if (getUserByEmail(email)) {
    return res.status(400).send("email exists in database pls dont hack me");
  }
  //create the user object and add it to the database then log the user in
  addNewUser([email, password]);
  req.session.user_email = email;
  res.redirect("/");
});


module.exports = router;
