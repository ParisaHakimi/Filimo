const MovieController = require("../controllers/movie.controllers");
module.exports = (app) => {
  app.get("/api/allMovies", MovieController.getAllMovies);
  app.get("/api/movieDetail/:id", MovieController.getOneMovie);
  app.post("/api/addMovie", MovieController.addMovie);
  app.put("/api/updateMovie/:id", MovieController.updateMovie);
  app.delete("/api/deleteMovie/:id", MovieController.deleteMovie);
};
