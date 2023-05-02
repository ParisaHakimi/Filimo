const UserController = require("../controllers/user.controllers");
// const { authenticate } = require("../config/jwt.config");

module.exports = (app) => {
  // log and reg commands
  app.get("/api/getLoggedUser", UserController.getLoggedUser); //get a user by
  app.post("/api/register", UserController.registerUser); // create a user
  app.post("/api/login", UserController.loginUser); // find a user
  app.get("/api/logout", UserController.logoutUser);

  // CRUD commands
  // in order for a user to access the "/api/allusers" route, they have to first login or register on the site
  // app.get("/api/allusers",authenticate, UserController.showAllUsers);
  app.get("/api/allusers", UserController.showAllUsers);
  app.get("/api/singleUsers/:id", UserController.showOneUser);
  app.put("/api/editUser/:id", UserController.editExistingUser);
  app.delete("/api/deleteUser/:id", UserController.deleteExistingUser);
};
