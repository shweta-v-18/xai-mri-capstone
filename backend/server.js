// // // server.js
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors'); // ✅ ADD THIS
// // require('dotenv').config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // app.use(cors()); // ✅ ADD THIS LINE TO ENABLE CORS
// // app.use(bodyParser.json());

// // // Import routes
// // const patientRoutes = require('./routes/patients');
// // app.use('/api/patients', patientRoutes);

// // app.get('/', (req, res) => {
// //   res.send('XAI-MedTrack Backend Running');
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// //chnaged part coorrect one
// // // server.js
// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const cors = require('cors');
// // require('dotenv').config();

// // const app = express();
// // const PORT = process.env.PORT || 5000;

// // app.use(cors());
// // app.use(bodyParser.json());

// // // ✅ Import routes
// // const patientRoutes = require('./routes/patients');
// // const authRoutes = require('./routes/auth');  // ✅ New auth routes for login/signup

// // // ✅ Use routes
// // app.use('/api/patients', patientRoutes);
// // app.use('/api', authRoutes);  // ✅ Mount at /api/signup and /api/login

// // //loginpart
// // const loginRoute = require('./routes/login');
// // app.use('/api/login', loginRoute);


// // // Default route
// // app.get('/', (req, res) => {
// //   res.send('XAI-MedTrack Backend Running');
// // });

// // app.listen(PORT, () => {
// //   console.log(`Server running on port ${PORT}`);
// // });

// // server.js
// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// app.use(cors({
//   origin: 'http://localhost:3000', // ✅ Frontend URL
//   credentials: true
// }));
// app.use(bodyParser.json());

// // ✅ Import routes
// const patientRoutes = require('./routes/patients');
// const authRoutes = require('./routes/auth');  // ✅ Contains /login and /signup

// // ✅ Use routes
// app.use('/api/patients', patientRoutes);
// app.use('/api', authRoutes);  // ✅ Now handles /api/signup and /api/login

// // ✅ Test route
// app.get('/', (req, res) => {
//   res.send('XAI-MedTrack Backend Running');
// });

// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// ✅ MySQL connection setup
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',  // Use .env file or default to localhost
  user: process.env.DB_USER || 'root',  // Use .env file or default to root
  password: process.env.DB_PASSWORD || 'mysql',  // Use .env file or hardcode for testing
  database: process.env.DB_NAME || 'xai_medtrack_db'  // Use .env file or your database name
});

connection.connect((err) => {
  if (err) {
    console.error('MySQL connection error: ', err);
    return;
  }
  console.log('MySQL connected successfully');
});

// Create the Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ✅ Enable CORS for frontend access
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL if deployed
  credentials: true
}));
app.use(bodyParser.json());

// ✅ Import routes
const patientRoutes = require('./routes/patients');
const authRoutes = require('./routes/auth');  // Handles /signup and /login

// ✅ Use routes
app.use('/api/patients', patientRoutes);
app.use('/api', authRoutes);  // This handles /api/signup and /api/login

// ✅ Default route for health check
app.get('/', (req, res) => {
  res.send('XAI-MedTrack Backend Running');
});

// ✅ Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});













































