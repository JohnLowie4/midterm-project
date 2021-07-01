// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const cookieSession = require("cookie-session");
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
} = require("./database/database");

const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));
app.use(
  cookieSession({
    name: "session",
    keys: ["key2", "key2"],
  })
);

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Separated Routes for each Resource
const loginRoutes = require("./routes/login");
const registerRoutes = require("./routes/register");
const logoutRoutes = require("./routes/logout");
const deleteRoutes = require("./routes/delete");
const todoRoutes = require("./routes/todo");

// Mount all resource routes
app.use("/register", registerRoutes);
app.use("/login", loginRoutes);
app.use("/logout", logoutRoutes);
app.use("/todos/delete", deleteRoutes);

// Mount all resource routes
app.use("/todo", todoRoutes(db)); //perfect

// Home page
app.get("/", (req, res) => {
  const templateVars = { user_email: req.session.user_email };
  if (!req.session.user_email) {
    res.redirect("login");
  } else {
    res.render("index", templateVars);
  }
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
