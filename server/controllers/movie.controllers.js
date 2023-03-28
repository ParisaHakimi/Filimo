const Movie = require("../models/movie.model");
module.exports = {
  getAllMovies: (req, res) => {
    Movie.find()
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  getOneMovie: (req, res) => {
    Movie.findById(req.params.id)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  addMovie: (req, res) => {
    Movie.create(req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  updateMovie: (req, res) => {
    Movie.updateOne({ _id: req.params.id }, req.body)
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
  deleteMovie: (req, res) => {
    Movie.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.json(result);
      })
      .catch((err) => console.log(err));
  },
};
