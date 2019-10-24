const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const User = require("../models/user");

exports.get_all_users = (req, res) => {
  User.find()
    .select("_id username password userImage")
    .exec()
    .then(doc => {
      console.log(doc);
      const response = {
        count: doc.length,
        users: doc.map(docs => {
          console.log(docs);
          return {
            _id: docs._id,
            username: docs.username,
            password: docs.password,
            userImage: docs.userImage,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + docs._id
            }
          };
        })
      };
      //   if (doc.length >= 0) {
      res.status(200).json(response);
      //   }
      //   } else {
      //     res.status(404).json(doc);
      //   }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.user_sign_up = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "username exists"
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              username: req.body.username,
              password: hash
            });
            user
              .save()
              .then(result => {
                console.log(result);
                res.status(201).json({
                  message: "User created"
                });
              })
              .catch(err => {
                console.log(err);
                res.status(500).json(err);
              });
          }
        });
      }
    });
};

exports.user_login = (req, res, next) => {
  User.find({ username: req.body.username })
    .exec()
    .then(user => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed"
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed"
          });
        }
        if (result) {
          console.log(process.env.JWT_KEY);
          const id = user[0]._id;
          const token = jwt.sign(
            {
              username: user[0],
              userId: id
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h"
            }
          );
          return res.status(200).json({
            message: "Auth successfull",
            id: id,
            token: token
          });
        }
        return res.status(401).json({
          message: "Auth failed"
        });
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
};

exports.get_user = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("_id username password userImage")
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc) {
        res.status(201).json({
          user: doc,
          request: {
            type: "GET",
            url: "http://localhost:3000/users/"
          }
        });
      } else {
        res
          .status(404)
          .json({ message: "No valid entry found for provided ID" });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.change_user_info = (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    console.log(ops.propName + " " + ops.value);
    updateOps[ops.propName] = ops.value;
  }
  console.log(updateOps);
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User updated",
        request: {
          type: "GET",
          url: "localhost:3000/users/" + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

exports.delete_user = (req, res, next) => {
  const id = req.params.userId;
  User.remove({ _id: id })
    .exec()
    .then(result => {
      res.status(200).json({
        message: "User deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/users",
          body: { username: "String", password: "String" }
        }
      });
    })
    .catch(err => {
      res.status(500).json({ error: err });
    });
};
