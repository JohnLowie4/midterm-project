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
 * @returns {Promise<[]>} an array of objects
 */
const getAll = (userID) => {
  const queryString = `SELECT * FROM todo_lists WHERE user_id = $1`;
  return pool
    .query(queryString, [userID])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/**
 * Gets all the active to do lists of a user
 * @param {Integer} userID
 * @returns {Promise<[]>} an array of objects
 */
const getAllActive = (userID) => {
  const queryString = `
    SELECT * FROM todo_lists
    WHERE user_id = $1 AND status = TRUE`;
  return pool
    .query(queryString, [userID])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/**
 * Gets all the archived to do lists of a user
 * @param {Integer} userID
 * @returns {Promise<[]>} an array of objects
 */
const getAllArchive = (userID) => {
  const queryString = `
    SELECT * FROM todo_lists
    WHERE user_id = $1 AND status = FALSE`;
  return pool
    .query(queryString, [userID])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/**
 * Gets all active to do list of a specific category of a user
 * @param {Integer} userID
 * @param {String} category
 * @returns {Promise<[]>} an array of objects
 */
const getActiveCategory = (userID, category) => {
  const queryString = `
    SELECT * FROM todo_lists
    WHERE status = TRUE
    AND user_id = $1
    AND category = $2`;
  return pool
    .query(queryString, [userID, category])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/**
 * Gets all archived to do list of a specific category of a user
 * @param {Integer} userID
 * @param {String} category
 * @returns {Promise<[]>} an array of objects
 */
const getArchivedCategory = (userID, category) => {
  const queryString = `
    SELECT * FROM todo_lists
    WHERE status = FALSE
    AND user_id = $1
    AND category = $2`;
  return pool
    .query(queryString, [userID, category])
    .then((result) => {
      return result.rows;
    })
    .catch((error) => {
      console.log(error. message);
    });
};

/**
 * Adds a new item to the to do list of a user
 * @param {Integer} userID
 * @param {Array} arrOfArgs An arry of arguments to be added into todo_lists database
 * @returns {Promise<{}>} an object of the new item added
 */
const addToDoList = (userID, arrOfArgs) => {
  const queryString = `
    INSERT INTO todo_lists (user_id, title, category, description)
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `;
  arrOfArgs.forEach(element => `${element}`);
  arrOfArgs.unshift(userID);  // Appends the userID as first element in arrOfArgs
  return pool
    .query(queryString, arrOfArgs)
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
};

/**
 * Updates a currently active item of a user
 * Can archive/un-archive items
 * @param {Integer} userID
 * @param {Integer} todoID Integer ID of a specified to do list
 * @param {Array} arrOfArgs An array of arguments to be updated
 * @returns {}
 */
const updateToDoList = (userID, todoID, arrOfArgs) => {
  return;
};

/**
 * Permanently deletes a specific to do item
 * Can be done for active and archived to do items
 * @param {Integer} userID
 * @param {Integer} todoID
 * @returns {Promise<{}>} an object of the item that was deleted
 */
const deleteToDoList = (userID, todoID) => {
  return pool
    .query(`
    DELETE FROM todo_lists
    WHERE user_id = $1
    AND id = $2
    RETURNING *`, [userID, todoID])
    .then((result) => {
      return result.rows[0];
    })
    .catch((error) => {
      console.log(error.message);
    });
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
