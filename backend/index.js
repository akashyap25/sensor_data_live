const express = require('express');
const cors = require('cors');
const db = require('./db');
const { configDotenv } = require('dotenv');

const app = express();
const port = 5000;

app.use(cors());
configDotenv();
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
