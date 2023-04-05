import React from "react";

const SearchResult = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center p-3">
      <h1 className="oneMovieTitle">title</h1>
      <div className="container d-flex">
        <img src="" alt="" className="oneMovieImage col col-3" />
        <div className="container ms-5 d-flex flex-column justify-content-around">
          <div className="container">
            <p>Directors: </p>
            <p>
              {/* {movie.rating}, {movie.genre}, {movie.duration} */}
              rating genre duration
            </p>
            <p>Relese Year: </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
