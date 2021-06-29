
const express = require('express');
const router  = express.Router();

module.exports = (database) => {
  //load existing todo items inthe database
  router.get("/", (req, res) => {
    database.query("SELECT * FROM todo_lists;").then((data) => {
      const todos = data.rows;
      res.send(todos)
    });
  });
  //add new todo item to database and add to page
  // router.post("/todo", (req, res) => {
  //   console.log(req.body.newTodo);
  // });

  return router;
};
