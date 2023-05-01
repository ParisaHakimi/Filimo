const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  showAllUsers: (res, req) => {
    User.find()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  showOneUser: (req, res) => {
    User.findOne({ _id: req.params.id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  editExistingUser: (req, res) => {
    User.updateOne({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  deleteExistingUser: (req, res) => {
    User.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  },
  registerUser: async (req, res) => {
    try {
      // create a new user
      const newUser = await User.create(req.body);
      // this will be the id of the user instance that was logged in.
      const payload = { _id: newUser._id, email: newUser.email };
      // create a JWT using our secret key 
      const userToken = jwt.sign(payload, SECRET);
      // return a response(JWT) to the user as a cookie - "httpOnly" means that the cookies are essentially invisible to client-side javascript and can only be read by the server
      res
        .status(201)
        .cookie("userToken", userToken, {
          httpOnly: true,
          expires: new Date(Date.now() + 900000),
        })
        .json({
          successMessage: "congratulation you logged in",
          user: newUser,
        });
    } catch (error) {
      res.status(400).json(error);
    }
  },
};
