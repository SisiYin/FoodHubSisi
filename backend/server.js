require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const { postRoutes, userRoutes } = require("./src/routes/index");
const { generateJWTSecret } = require("./src/config/jwt/generateJWTSecret");
const { Pool } = require("pg");
const moment = require("moment");
const databaseConfig = require("./src/config/database/config");

const pool = new Pool(databaseConfig);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/posts", postRoutes);
app.use("/user", userRoutes);

app.get("/user/:account_id", async (req, res) => {
  const account_id =2
  
  try {
    const result = await pool.query(
      "SELECT * FROM account WHERE account_id = $1;",
      [account_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/:account_id/comments", async (req, res) => {
  const account_id = 2;
  try {
    const result = await pool.query(
      "SELECT comment.*, post.title,post.description,post.photo_data,account.username,account.avatar FROM post JOIN comment on post.post_id = comment.post_id JOIN account ON account.account_id = comment.account_id WHERE comment.account_id = $1 ORDER BY date DESC;",
      [account_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get("/account/:account_id", async (req, res) => {
  const account_id = 2;
  try {
    const result = await pool.query(
      "SELECT post.*, account.username FROM post join account on post.account_id = account.account_id WHERE post.account_id = $1 ORDER BY date DESC;",
      [account_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to get a post by post_id
app.get("/posts/:postId", async (req, res) => {
  
  try {
    const result = await pool.query(
      "SELECT post.*, account.username FROM post join account on post.account_id = account.account_id WHERE post.post_id = $1;",
      [post_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Function to get comments by post_id
app.get("/posts/:postId/comments", async (req, res) => {
  
  try {
    const result = await pool.query(
      "SELECT comment.*, account.username, account.avantar FROM comment join account on comment.account_id = account.account_id WHERE post_id = $1 ORDER BY date DESC;",
      [post_id]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post("/newrate", (req, res) => {

  const { post_id, rate } = req.body;
  pool.query(
    "INSERT INTO star (post_id,rate) VALUES ($1,$2) returning *",
    [post_id, rate],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ id: result.rows[0].id });
      }
    }
  );
});

app.post("/newcomment", (req, res) => {
  
  //const { articleId } = req.params;
  const { post_id, account_id, comment, date } = req.body;
  pool.query(
    "INSERT INTO comment (post_id, account_id, comment,date) VALUES ($1,$2,$3,$4) returning *",
    [post_id, account_id, comment, date],
    (error, result) => {
      if (error) {
        res.status(500).json({ error: error.message });
      } else {
        res.status(200).json({ id: result.rows[0].id });
      }
    }
  );
});

// generateJWTSecret();
const port = process.env.PORT;
app.listen(port, console.log(`Port:${port} has been listening....`));
