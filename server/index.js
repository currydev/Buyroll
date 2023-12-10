require("dotenv").config(); // Ensure environment variables are loaded
const express = require("express");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

const app = express();

// CORS options for cross-origin allowance
var corsOptions = {
  origin: "http://localhost:8081" // Update this as per your frontend URL
};

app.use(cors(corsOptions));

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to SQLite database
let db = new sqlite3.Database('./mydb.sqlite3', sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
  if (err) {
    console.error(err.message);
  }
  console.log('Connected to the SQLite database.');
});

// Simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the application." });
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
