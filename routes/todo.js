const express = require("express");
const router = express.Router();
const { classifyText } = require("./determine_category_api");
const { pool, getUserByEmail } = require("../database/database");

module.exports = (database) => {
  //load existing todo items inthe database
  router.get("/", (req, res) => {
    //if logged in
    if (req.session.user_email) {
      database
        .query(`SELECT id FROM users WHERE email=$1`, [req.session.user_email])
        .then((userIDdata) => {
          const userID = userIDdata.rows[0].id;
          database
            .query("SELECT * FROM todo_lists WHERE user_id=$1;", [userID])
            .then((data) => {
              const todos = data.rows;
              console.log(todos);
              res.send(todos);
            });
        });
    }
    //if not logged in?
  });

  //new to-do
  router.post("/", async function (req, res) {
    if (!req.session.user_email){
      return res
      .status(403)
      .send("Must be logged in to create to-do list items!")
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

    //3. Route for the Deletion purpose
  // /todo/delete/:todoid - POST - To delete a particular Route.
  router.post("/delete/:todoid",(req,res)=>{
    console.log("I am in the delete todo route");
    console.log("The todo id is",req.params.todoid);
    res.json({result: "Record Deleted"});

  });

  //4 Route for the Edit Todo
  // /todo/edit/:todoid - POST - But for the Editing purpose
  router.post("/edit/:todoid",(req,res)=>{

  });

  return router;
};
