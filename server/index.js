require("dotenv").config(); // Ensure environment variables are loaded
const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const app = express();


// CORS options for cross-origin allowance
var corsOptions = {
  origin: "http://localhost:8081" // Update this as per your frontend URL
};

app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../public')));

// Connect to SQLite database
let db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Simple route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Additional routes (adjust as per your requirements)
// Example: require("./app/routes/tutorial.routes")(app);

// API Endpoints for Friends and Orders
// Fetch Friends List
app.get('/api/friends', (req, res) => {
  db.all("SELECT * FROM friends", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Invite Friend (Example: Adjust as needed)
app.post('/api/invite', (req, res) => {
  // Add logic for inviting a friend (e.g., inserting into the database)
});

// Fetch Orders
app.get('/api/orders', (req, res) => {
  db.all("SELECT * FROM orders", [], (err, rows) => {
    if (err) {
      res.status(500).send(err.message);
      return;
    }
    res.json(rows);
  });
});

// Set port and start the server
const PORT = process.env.PORT || 8080; // Changed from NODE_DOCKER_PORT to PORT for simplicity
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});

// Create tables if they do not exist
db.serialize(() => {
  // Create a 'friends' table
  db.run(`CREATE TABLE IF NOT EXISTS friends (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT,
    status TEXT
  )`);

  // Create an 'orders' table
  db.run(`CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    order_date DATE,
    order_amount REAL,
    customer_id INTEGER,
    FOREIGN KEY(customer_id) REFERENCES friends(id)
  )`);
});

// The rest of your Express app setup goes here...

// Close the database connection when the server is stopped
process.on('SIGINT', () => {
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Closed the database connection.');
    process.exit(0);
  });
});