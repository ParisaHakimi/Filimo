import React,{useState} from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'

const Search = ({searchResults, setSerachResults}) => {
  const [searchInputText, setSearchInputText] = useState("")
  const navigate = useNavigate()
  const submitHandler= async(e)=>{
    e.preventDefault();
    // it needs to "npm i dotenv" in client side to use process.env 
    if(searchInputText.trim()!== ""){
      // const res = await axios(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_OMDb_API_KEY}&t=${searchInputText}`);
      // console.log("res is: ",res)
      // getSearchedMovie(searchInputText);
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_TMDB_API_KEY}&query=${searchInputText}`
      );
      console.log("serach result response: ",response)
      setSerachResults(response.data.results);
      setSearchInputText("")
      navigate('./search-result')
    }
  }
  return (
    <form onSubmit={submitHandler} className="searchForm">
      {/* autoComplete="off" => To disable the autocomplete of text in forms and inputs  */}
      <input type="text" value={searchInputText} placeholder="Search A Movie" autoComplete="off" onChange={(e)=>setSearchInputText(e.target.value)} className="searchInput me-1"/>
      <button className="btn btn-light"><i className="fa fa-search" aria-hidden="true"></i></button>
    </form>
  )
};

export default Search;
