const { Pool } = require('pg');

const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});

/**
 * Gets all active and archived to do lists of a user
 * @param {Integer} userID
 * @returns a promise
 */
const getAll = (userID) => {
  return;
};

/**
 * Gets all the active to do lists of a user
 * @param {Integer} userID
 * @returns a promise
 */
const getAllActive = (userID) => {
  return;
};

/**
 * Gets all the archived to do lists of a user
 * @param {Integer} userID
 * @returns a promise
 */
const getAllArchive = (userID) => {
  return;
};

/**
 * Gets all active to do list of a specific category of a user
 * @param {Integer} userID
 * @param {String} category
 * @returns a promise
 */
const getActiveCategory = (userID, category) => {
  return;
};

/**
 * Gets all archived to do list of a specific category of a user
 * @param {Integer} userID
 * @param {String} category
 * @returns a promise
 */
const getArchivedCategory = (userID, category) => {
  return;
};

/**
 * Adds a new item to the to do list of a user
 * @param {Integer} userID
 * @param {Array} arrOfArgs An arry of arguments to be added into todo_lists database
 */
const addToDoList = (userID, arrOfArgs) => {

};

/**
 * Updates a currently active item of a user
 * @param {Integer} userID
 * @param {Integer} todoID Integer ID of a specified to do list
 * @param {Array} arrOfArgs An array of arguments to be updated
 */
const updateToDoList = (userID, todoID, arrOfArgs) => {

};

/**
 * Permanently deletes a specific to do item
 * Can be done for active and archived to do items
 * @param {Integer} userID
 * @param {Integer} todoID
 */
const deleteToDoList = (userID, todoID) => {

};

module.exports = {
  getAll,
  getAllActive,
  getAllArchive,
  getActiveCategory,
  getArchivedCategory,
  addToDoList,
  updateToDoList,
  deleteToDoList
};
