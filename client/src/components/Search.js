import React,{useState} from "react";

const Search = ({getMovie}) => {
  const [text, setText] = useState("")
  const submitHandler= (e)=>{
    e.preventDefault();
    if(text.trim()!== ""){
      getMovie(text);
      setText("")
    }
  }
  return (
    <form onSubmit={submitHandler} className="searchForm">
      <input type="text" value={text} placeholder="Search A Movie" onChange={(e)=>setText(e.target.value)} className="searchInput me-1"/>
      <button className="btn btn-light"><i className="fa fa-search" aria-hidden="true"></i></button>
    </form>
  )
};

export default Search;
