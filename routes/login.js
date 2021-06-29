//file for handling login route

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
  deleteToDoList
} = require('../database/database')

// GET /login
router.get('/', (req, res) => {
  const templateVars = { user_email: req.session.user_email};
  res.render("login", templateVars);
})

//post /login
router.post("/", (req, res) => {
  //store the incoming email and password fields
  const email = req.body.email;
  const password = req.body.password;
  // const user = getUserByEmail(email);
  getUserByEmail(email)
  .then((result) => {
    if (!result) {
      console.log("result", result);
      return res.status(403).send("email not found");
    }
    if (password !== result.password) { //check if password matches the one in our database
      console.log(result);
      return res.status(403).send("incorrect password");
    }
    //set the cookie the redirect to home page
    req.session.user_email = result.email;
    console.log("testing", req.session.user_email);
    const templateVars = {user_id: req.session.user_email};
    res.redirect("/");

  });

  //check if user exists
  // if (!user) {
  //   return res.status(403).send("email not found");
  // }
  // if (password !== user.password) { //check if password matches the one in our database
  //   console.log(user);
  //   return res.status(403).send("incorrect password");

  // }
  // //set the cookie the redirect to home page
  // req.session.user_id = 1;
  // res.redirect("/");
});


module.exports = router;
