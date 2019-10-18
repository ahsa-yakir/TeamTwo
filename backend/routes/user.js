const jwt = require("jsonwebtoken");
const express = require("express");
const bcrypt = require("bcrypt");
const Signup = require("../models/database");
const User = require("../models/user.js");
const router = express.Router();

router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then(hash => {
    User.create({
      email: req.body.email,
      password: hash,
    }).then(result => {
      res.status(201).json({
        message: "User Created",
        result: result,
      });
    }).catch(err => {
      res.status(500).json({
        error: err,
      });
    });
  });
});

router.post("/login", (req, res, next) => {
  let grabbedUser;
  User.findOne({ where: { email: req.body.email } })
    .then(user => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      grabbedUser = user;
      bcrypt.compare(req.body.password, user.dataValues.password)
        .then(result => {
          if (!result) {
            return res.status(401).json({
              message: "Auth failed",
            });
          }
          const token = jwt.sign(
            {
              email: grabbedUser.dataValues.email,
              userId: grabbedUser.dataValues.userId
            },
            "pubveowvpmqvqcnzxljczcxlmwgorvnyb",
            { expiresIn: "1h" },
          );
          res.status(200).json({
            token: token,
            expiresIn: 3600,
          });
        })
        .catch(err => { // if error was thrown return 401 status
          return res.status(401).json({
            message: "Auth failed",
          });
        });
    });
});

module.exports = router;
