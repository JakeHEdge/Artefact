const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.json());

const USER_ID = 1;

/* GET habits */
app.get("/api/habits", async (req, res) => {
  const [rows] = await db.query(
    "SELECT * FROM habits WHERE user_id=?",
    [USER_ID]
  );
  res.json(rows);
});

/* CREATE habit */
app.post("/api/habits", async (req, res) => {

  const { name, description } = req.body;

  const [result] = await db.query(
    "INSERT INTO habits (user_id,name,description) VALUES (?,?,?)",
    [USER_ID,name,description]
  );

  res.json({ id: result.insertId });
});

/* UPDATE habit */
app.put("/api/habits/:id", async (req,res) => {

  const { name, description } = req.body;

  await db.query(
    "UPDATE habits SET name=?, description=? WHERE id=?",
    [name,description,req.params.id]
  );

  res.json({ success:true });

});

/* DELETE habit */
app.delete("/api/habits/:id", async (req,res) => {

  await db.query(
    "DELETE FROM habits WHERE id=?",
    [req.params.id]
  );

  res.json({ success:true });

});

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});