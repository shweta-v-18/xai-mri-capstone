import mysql from "mysql2/promise"

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "mysql",
  database: process.env.DB_NAME || "xai_medtrack_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
})

export default pool

