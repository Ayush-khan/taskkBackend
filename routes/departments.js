const express = require("express");
const db = require("../db");

const router = express.Router();

// Get all departments
router.get("/", (req, res) => {
  db.query("SELECT * FROM department", (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving departments");
    } else {
      res.json(result);
    }
  });
});

// Get a department by ID
router.get("/:id", (req, res) => {
  const id = req.params.id;
  db.query(`SELECT * FROM department WHERE department_id = ${id}`, (err, result) => {
    if (err) {
      res.status(500).send("Error retrieving department");
    } else {
      res.json(result);
    }
  });
});

module.exports = router;
