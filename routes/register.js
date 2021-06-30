
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
  getUserByEmail(email)
  .then((result) => {
    console.log("🚀 ~ file: register.js ~ line 35 ~ .then ~ result", result)

    if (result["email"]) {
      console.log("🚀 ~ file: login.js ~ line 35 ~ .then ~ result", result)
      return res.status(403).send("email already exists");
    }
    else {
      addNewUser([email, password]);
      req.session.user_email = email;
      res.redirect("/");
    }
    // addNewUser([email, password]);
    // req.session.user_email = email;
    // res.redirect("/");
  })

  .catch((error) => {
    addNewUser([email, password]);
    req.session.user_email = email;
    res.redirect("/");
  });

  //check if the email already exists needs to be implemented

});


module.exports = router;
