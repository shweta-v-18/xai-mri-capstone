const express = require('express');
const router = express.Router();
const db = require('../lib/db');  // ✅ Correct path


router.get('/', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM Patients');
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
