//file for handling login route

const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

// GET /login
router.get('/', (req, res) => {
  const templateVars = { user_id: req.session.user_id};
  res.render("login", templateVars);
})

//post /login
// router.post("/", (req, res) => {
//   //store the incoming email and password fields
//   const email = req.body.email;
//   const password = req.body.password;
//   const user = getUserByEmail(email, users);
//   //check if user exists
//   if (!user) {
//     return res.status(403).send("email not found");
//   }
//   if (!bcrypt.compareSync(password, user.password)) { //check if password matches the one in our database
//     return res.status(403).send("incorrect password");
//   }
//   //set the cookie the redirect to home page
//   req.session.user_id = user.id;
//   res.redirect("/");
// });


module.exports = router;
