const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// CHANGE THESE TO YOUR MYSQL DETAILS
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Student1000",
  database: "habit_tracker",
});

db.connect((err) => {
  if (err) {
    console.error("DB connection error:", err);
  } else {
    console.log("MySQL Connected");
  }
});

app.get("/api/test", (req, res) => {
  res.json({ message: "API working" });
});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
