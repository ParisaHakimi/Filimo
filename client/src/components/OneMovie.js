import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate,Link} from "react-router-dom";

const OneMovie = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState({});

  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/movie/${id}`)
      .then((res) => {
        setMovie(res.data);
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
          src={movie.BoxArt}
          alt={movie.title}
          className="oneMovieImage col col-3"
        />
        <div className="container ms-5 d-flex flex-column justify-content-around">
          <div className="container">
            <p>Directors: {movie.director}</p>
            <p>
              {movie.rating}, {movie.genre}, {movie.duration}
            </p>
            <p>Relese Year: {movie.releaseYear}</p>
          </div>
          <div className="container">
            <button
              className="btn btn-danger w-25 me-4"
              onClick={(e) => deleteHandler(movie._id)}
            >
              <i className="fa fa-trash" aria-hidden="true"></i> Delete
            </button>
            <Link to={`/Update-A-Movie/${movie._id}`}className="btn btn-warning w-25">
              <i className="fa fa-pencil" aria-hidden="true"></i> Edit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OneMovie;
