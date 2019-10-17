const express = require("express");
const multer = require("multer");
const Post = require("../models/database")

const router = express.Router();
const MIME_TYPE_MAP = {
  'image/png': 'png',
  'image/jpeg': 'jpeg',
  'image/jpg': 'jpg'
};
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname.toLowerCase().split(' ').join('-');
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + '-' + Date.now() + '-' + ext);
  }
});
router.post("", multer({fileStorage: fileStorage}).single("image"),(req, res, next) => {
  const post = new Post({
    title: req.body.title,
    content: req.body.content
  });
  
  
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

router.put("/:id", (req, res, next) =>  {
  Post.query(
    'UPDATE posts SET title = $1, content = $2 WHERE id = $3',
    [req.body.title, req.body.content, req.body.id],
      (err,results) => {
        if (err) {
          console.log(err.stack)
        } else {
          res.status(200).json({
            message: "Post updated successfully",
          })
        }
      }
  )
});

router.get('', (req, res, next) => {
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

router.get('/:id', (req,res,next) => {
  Post.query(
    'SELECT * FROM posts WHERE id = $1',
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(404).json({ message: "Post not found!" })
      } else {
        console.log(results.rows[0])
        res.status(200).json({
          id: results.rows[0].id,
          title: results.rows[0].title,
          content: results.rows[0].content
        })
      }
    }
    
  )
})

router.delete("/:id", (req, res, next) => {

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

module.exports = router;
