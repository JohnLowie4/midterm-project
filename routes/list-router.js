const express = require("express");
const router = express.Router();
const dbQueries = require('../database/database')

router.get('/', (req, res) => {
  dbQueries.getAll('1')
  .then((items) => {
    res.json(items);
  });


});

module.exports = router;
