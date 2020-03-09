const userRouter = require("express").Router();

let User = require("../models/user.model");

userRouter.route("/").get((req, res) => {
  User.find({})
    .then(users => res.json(users))
    .catch(err => res.status(400).json(err));
});

userRouter.route("/add").post((req, res) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(user => res.json(user))
    .catch(err => res.status(400).json("Error: " + err));
});

module.exports = userRouter;
