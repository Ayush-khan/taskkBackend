const express = require('express');
const router = express.Router();
const db = require('../db');

// Get all classes
router.get('/', (req, res) => {
  db.query('SELECT * FROM class', (err, result) => {
    if (err) {
      res.status(500).send('Error retrieving classes');
    } else {
      res.json(result);
    }
  });
});

// Create a new class
router.post('/', (req, res) => {
  const { name, department_id } = req.body;
  if (!name || !department_id) {
    res.status(400).send('Name and department_id are required');
  } else {
    db.query(
      'INSERT INTO class (name, department_id) VALUES (?, ?)',
      [name, department_id],
      (err, result) => {
        if (err) {
          res.status(500).send('Error creating class');
        } else {
          res.status(201).send('Class created successfully');
        }
      }
    );
  }
});

// Update a class
router.put('/:id', (req, res) => {
  const classId = req.params.id;
  const { name, department_id } = req.body;
  if (!name || !department_id) {
    res.status(400).send('Name and department_id are required');
  } else {
    db.query(
      'UPDATE class SET name=?, department_id=? WHERE class_id=?',
      [name, department_id, classId],
      (err, result) => {
        if (err) {
          res.status(500).send('Error updating class');
        } else {
          res.send('Class updated successfully');
        }
      }
    );
  }
});

// Get a specific class
router.get('/:id', (req, res) => {
  const classId = req.params.id;
  db.query(
    `SELECT * FROM class WHERE class_id = ?`,
    [classId],
    (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving class');
      } else {
        res.json(result);
      }
    }
  );
});

// Delete a class
router.delete('/:id', (req, res) => {
  const classId = req.params.id;
  db.query('DELETE FROM class WHERE class_id = ?', [classId], (err, result) => {
    if (err) {
      res.status(500).send('Error deleting class');
    } else {
      res.send('Class deleted successfully');
    }
  });
});

module.exports = router;
