// Load environment variables from .env file
require('dotenv').config();

// Import modules
const express = require('express');
const mysql = require('mysql2');


const app = express();

// Connection to the database 
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

// Testing database connection
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    return;
  }
  console.log('Successfully connected to the database');
});

// Parse JSON
app.use(express.json());

// Question 1 goes here
app.get('/patients', (req, res) => {
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients';
  
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving patients:', err.message);
      return res.status(500).json({ error: 'Error retrieving patients' });
    }
    res.json(results);
  });
});

// Question 2 goes here
app.get('/providers', (req, res) => {
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers';

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error retrieving providers:', err.message);
      return res.status(500).json({ error: 'Error retrieving providers' });
    }
    res.json(results);
  });
});

// Question 3 goes here
app.get('/patients/:first_name', (req, res) => {
  const firstName = req.params.first_name;
  const query = 'SELECT patient_id, first_name, last_name, date_of_birth FROM patients WHERE first_name = ?';
  
  connection.query(query, [firstName], (err, results) => {
    if (err) {
      console.error('Error filtering patients:', err.message);
      return res.status(500).json({ error: 'Error filtering patients' });
    }
    res.json(results);
  });
});

// Question 4 goes here
app.get('/providers/specialty/:provider_specialty', (req, res) => {
  const specialty = req.params.provider_specialty;
  const query = 'SELECT first_name, last_name, provider_specialty FROM providers WHERE provider_specialty = ?';

  connection.query(query, [specialty], (err, results) => {
    if (err) {
      console.error('Error filtering providers by specialty:', err.message);
      return res.status(500).json({ error: 'Error filtering providers by specialty' });
    }
    res.json(results);
  });
});

// listen to the server
const PORT = 3000
app.listen(PORT, () => {
  console.log(`server is runnig on http://localhost:${PORT}`)
})
