const express = require('express');
const router = express.Router();
const mysql = require('mysql2/promise');
const bcrypt = require('bcryptjs');

// POST /signup
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'mysql', // Replace with your actual password
      database: 'xai_medtrack_db',
    });

    const [existingDoctor] = await connection.execute(
      'SELECT * FROM Doctors WHERE email = ?',
      [email]
    );

    if (existingDoctor.length > 0) {
      await connection.end();
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connection.execute(
      'INSERT INTO Doctors (email, password_hash) VALUES (?, ?)',
      [email, hashedPassword]
    );

    await connection.end();

    return res.status(201).json({ message: 'Signup successful' });
  } catch (error) {
    console.error('Error during signup:', error);
    return res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
