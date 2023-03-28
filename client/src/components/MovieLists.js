import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link} from 'react-router-dom'

const MovieLists = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/allMovies")
      .then((res) => {
        console.log(res);
        setList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div>
      <h1 className="movie-list mt-3">Movies</h1>
      <div className="container d-flex movie-list-container p-3">
      {list.map((movie,i) => (
        
          <Link to={`/oneMovie/${movie._id}`} 
           className="card mb-3">
            <img
              src={movie.BoxArt}
              alt={movie.title}
              className="card-img-top movie-list-img"
            />
            <div className="card-body">
              <h5 to={`/oneMovie/${movie._id}`} className="card-title text-light">{movie.title}</h5>
            </div>
          </Link>
       
      ))}
       </div>
    </div>
  );
};

export default MovieLists;
