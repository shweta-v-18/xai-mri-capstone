// const mysql = require('mysql2/promise');
// require('dotenv').config();

// const db = mysql.createPool({
//   host: process.env.DB_HOST,     // e.g., 'localhost'
//   user: process.env.DB_USER,     // e.g., 'root'
//   password: process.env.DB_PASS, // your DB password
//   database: process.env.DB_NAME  // e.g., 'xaidb'
// });

// module.exports = db;

const mysql = require('mysql2/promise');
require('dotenv').config();

const db = mysql.createPool({
  host: process.env.DB_HOST,       // e.g., 'localhost'
  user: process.env.DB_USER,       // e.g., 'root'
  password: process.env.DB_PASSWORD, // Changed from DB_PASS to match your .env file
  database: process.env.DB_NAME    // e.g., 'xaidb'
});

module.exports = db;