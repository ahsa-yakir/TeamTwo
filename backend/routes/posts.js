const express = require("express");
const Post = require("../database");
const router = express.Router();
const multer = require("multer");
const checkAuth = require("../middleware/check-auth");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/jpg": "jpg"
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const isValid = MIME_TYPE_MAP[file.mimetype];
    let error = new Error("Invalid mime type");
    if (isValid) {
      error = null;
    }
    cb(error, "backend/images");
  },
  filename: (req, file, cb) => {
    const name = file.originalname
      .toLowerCase()
      .split(" ")
      .join("-");
    const ext = MIME_TYPE_MAP[file.mimetype];
    cb(null, name + "-" + Date.now() + "." + ext);
  }
});

router.post(
  "",
  multer({ storage: storage }).single("image"),
  checkAuth,
  (req, res, next) => {
    const url = req.protocol + "://" + req.get("host");
    Post.query(
      "INSERT INTO posts(title, content, imagepath) VALUES($1, $2, $3) RETURNING *",
      [req.body.title, req.body.content, url + "/images/" + req.file.filename],
      (err, createdPost) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.status(201).json({
            message: "Post Created!",
            post: {
              id: createdPost.rows[0].id,
              title: createdPost.rows[0].title,
              content: createdPost.rows[0].content,
              imagePath: createdPost.rows[0].imagepath
            }
          });
        }
      }
    );
  }
);

//Update Post
router.put(
  "/:id",
  multer({ storage: storage }).single("image"),
  (req, res, next) => {
    let imagePath = req.body.imagepath;
    if (req.file) {
      const url = req.protocol + "://" + req.get("host");
      imagePath = url + "/images/" + req.file.filename;
    }
    Post.query(
      "UPDATE posts SET title = $1, content = $2, imagepath = $4 WHERE id = $3",
      [req.body.title, req.body.content, req.body.id, imagePath],
      (err, results) => {
        if (err) {
          console.log(err.stack);
        } else {
          res.status(200).json({
            message: "Post updated successfully"
          });
        }
      }
    );
  }
);

router.get("", (req, res, next) => {
  Post.query("SELECT * FROM posts", (err, results) => {
    if (err) {
      console.log(err.stack);
    } else {
      res.status(200).json({
        message: "Posts fetched successfully!",
        posts: results.rows
      });
    }
  });
});

router.get("/:id", (req, res, next) => {
  Post.query(
    "SELECT * FROM posts WHERE id = $1",
    [req.params.id],
    (err, results) => {
      if (err) {
        res.status(404).json({ message: "Post not found!" });
      } else {
        console.log(results.rows[0]);
        res.status(200).json({
          id: results.rows[0].id,
          title: results.rows[0].title,
          content: results.rows[0].content,
          imagePath: results.rows[0].imagepath
        });
      }
    }
  );
});

router.delete("/:id", checkAuth, (req, res, next) => {
  Post.query(
    "DELETE FROM posts WHERE id = $1",
    [req.params.id],
    (err, result) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log(result);
        res.status(200).json({ message: "Post deleted" });
      }
    }
  );
});

module.exports = router;
