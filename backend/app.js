const express = require("express");
const bodyParser = require("body-parser")
const Post = require("./models/database")

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.post("/api/posts", (req, res, next) => {
  Post.query(
  'INSERT INTO posts(title, content) VALUES($1, $2) RETURNING *',
  [req.body.title, req.body.content],
    (err,createdPost) => {
      if (err) {
        console.log(err.stack)
      } else {
        res.status(201).json({
          message: "Post Created!",
          postId: createdPost.rows[0].id
        })
      }
    }
  )
});

app.get('/api/posts', (req, res, next) => {
  Post.query(
    'SELECT * FROM posts',
    (err,results) => {
      if (err) {
        console.log(err.stack)
      } else {
        res.status(200).json({
          message: "Posts fetched successfully!",
          posts: results.rows
        })
      }
    }
  )
});

app.delete("/api/posts/:id", (req, res, next) => {
  Post.query(
    'DELETE FROM posts WHERE id = $1',
    [req.params.id],
    (err,result) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(result)
        res.status(200).json({message: "Post deleted"})
      }
    }
  )
  
});

module.exports = app;