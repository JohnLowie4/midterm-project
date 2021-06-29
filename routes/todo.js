const express = require("express");
const router = express.Router();
const { classifyText } = require("./determine_category_api");

module.exports = (database) => {
  //load existing todo items inthe database
  router.get("/", (req, res) => {
    database.query("SELECT * FROM todo_lists;").then((data) => {
      const todos = data.rows;
      res.send(todos);
    });
  });

  //new to-do
  router.post("/", async function (req, res) {
    let newToDo = await classifyText(req.body.task);
    res.send(newToDo);
    const queryString = `
    INSERT INTO todo_lists (user_id, title, category, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
    const queryValues = [1, req.body.task, newToDo, "description"];
    database.query(queryString, queryValues);
    console.log(database.query);
  });

  return router;
};
