import React,{useState} from "react";
import axios from "axios";

const Search = ({getMovie}) => {
  const [inputText, setinputText] = useState("")
  const submitHandler= async(e)=>{
    e.preventDefault();
    // it needs to "npm i dotenv" in client side to use process.env 
    if(inputText.trim()!== ""){
      const res = await axios(`http://www.omdbapi.com/?i=tt3896198&apikey=${process.env.REACT_APP_OMDb_API_KEY}&t=${inputText}`);
      console.log(res)
      //const data = res.json()
      //console.log("data is: ",data)
      getMovie(inputText);
      // setText("")
    }
  }
  return (
    <form onSubmit={submitHandler} className="searchForm">
      <input type="text" value={inputText} placeholder="Search A Movie" onChange={(e)=>setinputText(e.target.value)} className="searchInput me-1"/>
      <button className="btn btn-light"><i className="fa fa-search" aria-hidden="true"></i></button>
    </form>
  )
};

export default Search;
