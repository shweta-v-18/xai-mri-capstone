// // routes/auth.js
// const express = require('express');
// const router = express.Router();
// const pool = require('../lib/db');
// const bcrypt = require('bcrypt');  // ✅ for password hashing

// // Signup Route (Doctors)
// router.post('/signup', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     // Check if email exists
//     const [existingDoctor] = await pool.query('SELECT * FROM Doctors WHERE email = ?', [email]);
//     if (existingDoctor.length > 0) {
//       return res.status(400).json({ success: false, message: 'Email already registered' });
//     }

//     // Hash password before storing
//     const saltRounds = 10;
//     const passwordHash = await bcrypt.hash(password, saltRounds);

//     // Insert into Doctors table
//     await pool.query('INSERT INTO Doctors (email, password_hash) VALUES (?, ?)', [email, passwordHash]);

//     res.status(201).json({ success: true, message: 'Signup successful' });
//   } catch (err) {
//     console.error("Signup error:", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// // Login Route (Doctors)
// router.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const [rows] = await pool.query('SELECT * FROM Doctors WHERE email = ?', [email]);

//     if (rows.length === 0) {
//       return res.status(401).json({ success: false, message: "Invalid email or password" });
//     }

//     const doctor = rows[0];

//     // Compare entered password with stored hash
//     const passwordMatch = await bcrypt.compare(password, doctor.password_hash);

//     if (passwordMatch) {
//       res.json({ success: true, message: "Login successful", doctor: { id: doctor.doctor_id, email: doctor.email } });
//     } else {
//       res.status(401).json({ success: false, message: "Invalid email or password" });
//     }
//   } catch (err) {
//     console.error("Login error:", err);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });




// module.exports = router;
// routes/auth.js
const express = require('express');
const router = express.Router();
const pool = require('../lib/db');
const bcrypt = require('bcrypt');

// Signup Route (Doctors)
router.post('/signup', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    // Check if email exists
    const [existingDoctor] = await pool.query('SELECT * FROM Doctors WHERE email = ?', [email]);
    if (existingDoctor.length > 0) {
      return res.status(400).json({ success: false, message: 'Email already registered' });
    }

    // Hash password before storing
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    console.log(`Creating new user: ${email} with hash length: ${passwordHash.length}`);

    // Insert into Doctors table
    await pool.query('INSERT INTO Doctors (email, password_hash) VALUES (?, ?)', [email, passwordHash]);

    res.status(201).json({ success: true, message: 'Signup successful' });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Enhanced Login Route with debugging
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ success: false, message: 'Email and password are required' });
  }

  try {
    console.log(`Login attempt for: ${email}`);
    
    // First, check database structure
    try {
      const [columns] = await pool.query('SHOW COLUMNS FROM Doctors');
      const columnNames = columns.map(col => col.Field);
      console.log('Table structure:', columnNames);
    } catch (structErr) {
      console.error('Error checking table structure:', structErr);
    }
    
    // Query user
    const [rows] = await pool.query('SELECT * FROM Doctors WHERE email = ?', [email]);
    console.log(`Found user records: ${rows.length}`);

    if (rows.length === 0) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const doctor = rows[0];
    console.log('User found with ID:', doctor.doctor_id);
    console.log('Hash in DB:', doctor.password_hash ? `${doctor.password_hash.substring(0, 10)}... (length: ${doctor.password_hash.length})` : 'MISSING');
    
    // Handle missing password hash
    if (!doctor.password_hash) {
      console.error('Password hash is missing or null in database!');
      return res.status(500).json({ success: false, message: "Account configuration error" });
    }

    // Compare entered password with stored hash
    try {
      const passwordMatch = await bcrypt.compare(password, doctor.password_hash);
      console.log('Password comparison result:', passwordMatch);
      
      if (passwordMatch) {
        console.log('Login successful for user ID:', doctor.doctor_id);
        res.json({ 
          success: true, 
          message: "Login successful", 
          doctor: { id: doctor.doctor_id, email: doctor.email } 
        });
      } else {
        res.status(401).json({ success: false, message: "Invalid email or password" });
      }
    } catch (bcryptErr) {
      console.error('bcrypt comparison error:', bcryptErr);
      res.status(500).json({ success: false, message: "Error validating credentials" });
    }
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

// Diagnostic route - use this to test database connection
router.get('/check-db', async (req, res) => {
  try {
    const [result] = await pool.query('SELECT 1 as connected');
    res.json({ 
      success: true, 
      connected: result[0].connected === 1,
      message: "Database connection successful"
    });
  } catch (err) {
    console.error("Database check error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Database connection failed",
      error: err.message
    });
  }
});

// Test login route - for troubleshooting only (remove in production)
router.post('/test-login', async (req, res) => {
  const { email } = req.body;
  try {
    const [rows] = await pool.query('SELECT * FROM Doctors WHERE email = ?', [email]);
    
    if (rows.length > 0) {
      const doctor = rows[0];
      res.json({ 
        success: true, 
        message: "User found", 
        debug: {
          id: doctor.doctor_id,
          email: doctor.email,
          hasPasswordHash: !!doctor.password_hash,
          hashPreview: doctor.password_hash ? 
            `${doctor.password_hash.substring(0, 10)}... (length: ${doctor.password_hash.length})` : 'MISSING'
        }
      });
    } else {
      res.status(404).json({ 
        success: false, 
        message: "User not found", 
        debug: { email }
      });
    }
  } catch (err) {
    console.error("Test login error:", err);
    res.status(500).json({ 
      success: false, 
      message: "Error during test", 
      error: err.message 
    });
  }
});

module.exports = router;