const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.SECRET_KEY;

module.exports = {
  // ** NOTE ** : remember to write (req,res) in order 
  showAllUsers: (req, res) => {
    User.find()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => {
        // console.log(err)
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
    // remember to uncomment the middleware for confirmPassword on user.model file
  // login user is using cookies
  loginUser: async (req, res) => {
    // find a user who is already exist in our database based on their email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.status(400).json({ error: "invalid email/password" });
    }
    try {
      // "req.body.password" => regular string password
      // "user.password" => hashed password
      const isPasswordValid = await bcrypt.compare(
        req.body.password,
        user.password
      );
      console.log(isPasswordValid);
      if (!isPasswordValid) {
        res.status(400).json({ error: "invalid email/password" });
      } else {
        const userToken = jwt.sign(
          // it doesn't have to be all the information, it can be some data that's part of the payload
          { _id: user._id, email: user.email },
          SECRET
        );
        res
          .status(201)
          .cookie("userToken", userToken, {
            httpOnly: true,
            expires: new Date(Date.now() + 5400000),
          })
          .json({
            successMessage: "User logged in",
            user: user,
          });
      }
    } catch (error) {
      res.status(400).json({ error: "invalid email/password" });
    }
  },
  getLoggedUser: (req, res) => {
    const decodedJWT = jwt.decode(req.cookies.userToken, {
      complete: true,
    });
    const loggedUser = User.findById(decodedJWT.payload._id);
    decodedJWT &&
      loggedUser
        .then((result) => res.json(result))
        .catch((err) => res.status(400).json(err));
  },
  logoutUser: (req, res) => {
    res.clearCookie("userToken"); // clear the userToken cookie
    res.json({ success: "Logged out" });
  },
};
