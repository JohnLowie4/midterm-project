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
  getIdByEmail

} = require('../database/database')



router.post("/:todoid", (req, res) => {
  console.log("I am in the delete todo route");
  console.log("The todo id is",req.params.todoid);
  res.json({result: "Record Deleted"});
  // if (req.session.user_email) {
  //   console.log("🚀 ~ file: delete.js ~ line 23 ~ router.post ~ req.params.id)", req.params);
  //   deleteToDoList(getIdByEmail(req.session.user_email),req.params.id);
  // }
  // res.redirect("/login");
});



router.post("/", (req, res) => {
  if (req.session.user_email) {
    console.log("🚀 ~ file: delete.js ~ line 23 ~ router.post ~ req.params.id)", req.params);
    deleteToDoList(getIdByEmail(req.session.user_email),req.params.id);
  }
  res.redirect("/login");
});


module.exports = router;
