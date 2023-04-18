import axios from "axios";
import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";


const Home = () => {
const [recentMovies, setRecentMovies] = useState([]);
useEffect(() => {
 // Get a list of the current popular movies on TMDB. This list updates daily.
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
  .then(res=>{
    console.log("res.data: ",res.data)
    setRecentMovies(res.data.results)
  })
.catch(err=>console.log(err))
}, [])

  return (
    <div>
      {/* <div className="hero">
        <img src="./images/heroImg.jpg" alt="" className="img-fluid" />
      </div> */}
      <h1 className="movie-list mt-3">Popular Movies</h1>
      <div className="container d-flex movie-list-container p-3">
        {recentMovies.map((movie) => (
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
    </div>
  );
};

export default Home;
