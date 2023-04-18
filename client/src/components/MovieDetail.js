import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, Link } from "react-router-dom";

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});
  const [genre, setGenre] = useState([]);

  // .get(`http://localhost:8000/api/movieDetail/${id}`)
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`
      )
      .then((res) => {
        console.log("res.data.oneDetail", res.data);
        console.log("res.data.genres",res.data.genres)
        setMovie(res.data);
        setGenre(res.data.genres)
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const deleteHandler = (id) => {
    axios
      .delete(`http://localhost:8000/api/deleteMovie/${id}`)
      .then((res) => {
        console.log("deleted from db");
        navigate("/movieLists");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container d-flex flex-column justify-content-center align-items-center p-3">
      <h1 className="oneMovieTitle">{movie.title}</h1>
      <div className="container d-flex">
        <img
          src={`https://image.tmdb.org/t/p/w500//${movie.poster_path}`}
          alt={movie.title}
          className="oneMovieImage col col-3"
        />
        <div className="container ms-5 d-flex flex-column justify-content-around">
          <div className="container">
            {/* <p>Directors: {movie.director}</p> */}
            <div className="Movie-detail-rated  d-flex">
              <img src="/images/star.png" alt="rated-star" className="star" />
              <p className="rated-vote text-light fw-bold">{movie.vote_average}</p>
            </div>
            <p className="fw-bold">Popularity: {movie.popularity}</p>
            <hr />
           <p className="d-flex fw-bold align-items-center">Genre: {genre.map(genres=>(
              <button className="btn btn-warning ms-2"> {genres.name} </button>
            ))}</p>
            <p className="fw-bold">{movie.runtime} min</p>
            <p className="fw-bold">Language: {movie.original_language}</p>
            <p className="fw-bold">Release: {movie.release_date}</p>
            <p className="fw-bold">Overview: {movie.overview}</p>
          </div>
          {/* <div className="container">
            <button
              className="btn btn-danger w-25 me-4"
              onClick={(e) => deleteHandler(movie._id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i> Delete
            </button>
            <Link
              to={`/Update-A-Movie/${movie._id}`}
              className="btn btn-warning w-25"
            >
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit
            </Link>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
