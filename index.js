const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Database connection
const db = require('./db');

// Routes
const classesRouter = require('./routes/classRoutes.js');
const departmentsRouter = require('./routes/departments.js');

// Use route modules
app.use('/classes', classesRouter);
app.use('/departments', departmentsRouter);

// Get all data (classes with department details)
app.get('/', (req, res) => {
  const query = `
    SELECT c.class_id, c.name AS class_name, d.department_id, d.name AS department_name
    FROM class AS c
    INNER JOIN department AS d ON c.department_id = d.department_id;
  `;

  db.query(query, (err, result) => {
    if (err) {
      console.error('Error retrieving data:', err);
      res.status(500).send('Error retrieving data');
    } else {
      res.json(result);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
