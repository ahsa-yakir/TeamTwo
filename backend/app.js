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
    (err,res) => {
      if (err) {
        console.log(err.stack)
      } else {
        console.log(res.rows[0])
      }
    }
  )
  res.status(201).json({
    message: 'Post added successfully'
  });
});

app.get('/api/posts', (req, res, next) => {
  const posts = [
    { id: 'asdfa123411',
    title: 'First server-side post',
    content: 'This is coming from the server'
    },
    { id: 'asdfa123f',
    title: 'Second server-side post',
    content: 'This is coming from the server!'
    },
  ];
  res.status(200).json({
    message: 'Posts fetched succesfully!',
    posts: posts
  });
});

module.exports = app;