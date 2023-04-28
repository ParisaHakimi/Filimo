import React,{useState} from "react";
import { Link } from "react-router-dom";


const SearchResult = ({searchResults, setSerachResults}) => {
  return (
    // <div className="container d-flex flex-column justify-content-center align-items-center p-3">
    //   <h1 className="oneMovieTitle">title</h1>
    //   <div className="container d-flex">
    //     <img src="" alt="" className="oneMovieImage col col-3" />
    //     <div className="container ms-5 d-flex flex-column justify-content-around">
    //       <div className="container">
    //         <p>Directors: </p>
    //         <p>
    //           {/* {movie.rating}, {movie.genre}, {movie.duration} */}
    //           rating genre duration
    //         </p>
    //         <p>Relese Year: </p>
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div className="container d-flex movie-list-container p-3">
    {searchResults.map((movie) => (
      <Link to={`/movieDetail/${movie.id}`} className="card mb-3">
        <img
          src={`https://image.tmdb.org/t/p/w500//${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top movie-list-img"
        />
        <div className="rated">
        <img src="./images/star.png" alt="rated-star" className="star"/>
          <p className="rated-vote text-light">{movie.vote_average}</p>
        </div>
        <div className="home-movie-overlay text-light">More...</div>
      </Link>
    ))}
  </div>
  );
};

export default SearchResult;
