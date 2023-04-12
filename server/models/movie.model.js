const mongoose = require("mongoose");
const MovieSchema = new mongoose.Schema(
  {
    title: { type: String },
    director: {
      type: String,
    },
    rating: {
      type: String,
      enum: ["G", "PG", "PG-13", "R", "NC-17"],
    },
    genre: {
      type: String,
      enum: [
        "Comedy",
        "Drama",
        "Harror",
        "Sci-Fi",
        "Fantasy",
        "Action",
        "Family",
        "Animated",
        "Documentary",
        "Thriller",
        "Crime Noir",
        "Horror/Comedy",
        "Ballywood",
      ],
    },
    releaseYear: {
      type: Number,
    },
    duration: {
      type: String,
    },
    BoxArt: {
      type: String,
    },
  },
  { timestamps: true }
);
const Movie = mongoose.model("Movie", MovieSchema);
module.exports = Movie;
