const express = require("express");
const router = express.Router();
const { classifyText } = require("./determine_category_api");
const {
  pool,
  getUserByEmail,
  deleteToDoList,
  getIdByEmail,
  updateToDoList,
} = require("../database/database");

module.exports = (database) => {
  //Get Todos
  router.get("/", (req, res) => {
    if (req.session.user_email) {
      database
        .query(`SELECT id FROM users WHERE email=$1`, [req.session.user_email])
        .then((userIDdata) => {
          const userID = userIDdata.rows[0].id;
          database
            .query("SELECT * FROM todo_lists WHERE user_id=$1;", [userID])
            .then((data) => {
              const todos = data.rows;
              res.send(todos);
            });
        });
    }
  });

  //2 New Todo
  router.post("/", async function (req, res) {
    if (!req.session.user_email) {
      return res
        .status(403)
        .send("Must be logged in to create to-do list items!");
    }
    let newToDoCategory = await classifyText(req.body.task);
    res.send(newToDoCategory);
    database
      .query(`SELECT id FROM users WHERE email=$1`, [req.session.user_email])
      .then((userIDdata) => {
        const userID = userIDdata.rows[0].id;
        const queryString = `
      INSERT INTO todo_lists (user_id, title, category)
      VALUES ($1, $2, $3)
      RETURNING *
    `;
        const queryValues = [userID, req.body.task, newToDoCategory];
        database.query(queryString, queryValues);
      });
  });

  //3 Delete Todo
  router.post("/delete/:todoid", (req, res) => {
    getIdByEmail(req.session.user_email).then((result) => {
      console.log("ID" + result);
      deleteToDoList(result, req.params.todoid);
      res.json({ result: "Record Deleted" });
    });
  });

  //4 Edit Todo
  router.post("/edit/:todoid/:catid", (req, res) => {
    getIdByEmail(req.session.user_email).then((result) => {
      console.log("ID" + result);
      console.log(req.params.catid);
      updateToDoList(result, req.params.todoid, req.params.catid);
      res.json({ result: "Record Edited" });
    });
  });

  return router;
};
