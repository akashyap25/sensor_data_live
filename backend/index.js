const express = require('express');
const cors = require('cors');
const db = require('./db'); // Assuming './db' is a valid module that exports the database connection.
const dotenv = require('dotenv'); // The correct import statement for dotenv.

const app = express();
const port = 5000;

dotenv.config(); // Invoke dotenv to load environment variables from .env file.

app.use(cors());
app.get('/api/data', (req, res) => {
  const query = 'SELECT * FROM IOT';
  db.query(query, (err, result) => {
    if (err) {
      console.error('Error fetching data: ', err);
      res.status(500).send('Error fetching data');
    } else {
      console.log("result fetched");
      res.json(result);
    }
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
