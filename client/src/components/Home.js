import axios from "axios";
import React,{useState,useEffect} from "react";

const Home = () => {
const [topRatedMovies, setTopRatedMovies] = useState([]);
useEffect(() => {
 // Get a list of the current popular movies on TMDB. This list updates daily.
  axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US&page=1`)
  .then(res=>{
    console.log("res.data: ",res.data)
    // console.log("res.data.Search: ",res.data.Search)
    setTopRatedMovies(res.data.Search)
  })
.catch(err=>console.log(err))
}, [])

  return (
    <div>
      <div className="hero">
        <img src="./images/heroImg.jpg" alt="" className="img-fluid" />
      </div>
    </div>
  );
};

export default Home;
