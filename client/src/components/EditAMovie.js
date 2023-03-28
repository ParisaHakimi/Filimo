import React, { useState, useEffect } from "react";
import axios from "axios";
import {useParams, useNavigate} from 'react-router-dom'

const EditAMovie = () => {
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [rating, setRating] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState("");
  const [duration, setDuration] = useState("");
  const [image, setImage] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`http://localhost:8000/api/movie/${id}`)
    .then((res)=>{
        setTitle(res.data.title);
        setDirector(res.data.director);
        setRating(res.data.rating)
        setGenre(res.data.genre);
        setReleaseYear(res.data.releaseYear);
        setDuration(res.data.duration);
        setImage(res.data.BoxArt)
    })
    .catch((err)=>{
        console.log(err)
    })
  }, [])
  

  const submitHandler=(e)=>{
    e.preventDefault();
    axios.put(`http://localhost:8000/api/updateMovie/${id}`,{
        title,
        director,
        rating,
        genre,
        releaseYear,
        duration,
        BoxArt: image,
      })
    .then((res)=>{navigate("/movieLists")})
    .catch(err=>{console.log(err)})
  }
  return (
    <div className="col-6 mx-auto">
      <form onSubmit={submitHandler}>
        <label className="form-label">Title:</label>
        <input
          type="text"
          className="form-control"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="form-label">Director:</label>
        <input
          type="text"
          className="form-control"
          value={director}
          onChange={(e) => setDirector(e.target.value)}
        />
        <label className="form-label">Rating:</label>
        <select
          className="form-select"
          value={rating}
          onChange={(e) => setRating(e.target.value)}
        >
          <option value="" disabled>
            Select A Rating
          </option>
          <option value="G">G</option>
          <option value="PG">PG</option>
          <option value="PG-13">PG-13</option>
          <option value="R">R</option>
          <option value="NC-17">NC-17</option>
        </select>
        <label className="form-label">Genre:</label>
        <select
          className="form-select"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        >
          <option value="" disabled>
            Select A Genre
          </option>
          <option value="Comedy">Comedy</option>
          <option value="Drama">Drama</option>
          <option value="Harror">Harror</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Acttion">Acttion</option>
          <option value="Family">Family</option>
          <option value="Animated">Animated</option>
          <option value="Documentary">Documentary</option>
          <option value="Thriller">Thriller</option>
          <option value="Crime Noir">Crime Noir</option>
          <option value="Horror/Comedy">Horror/Comedy</option>
          <option value="Ballywood">Ballywood</option>
        </select>
        <label className="form-label">Release Year:</label>
        <input
          type="number"
          className="form-control"
          value={releaseYear}
          onChange={(e) => setReleaseYear(e.target.value)}
        />
        <label className="form-label">Duration:</label>
        <input
          type="text"
          className="form-control"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
        />
        <label className="form-label">Image:</label>
        <input
          type="text"
          className="form-control"
          value={image}
          onChange={(e) => setImage(e.target.value)}
        />
        <button type="submit" className="btn btn-info mt-3 w-100">
          Update Movie
        </button>
      </form>
    </div>
  );
};

export default EditAMovie;
