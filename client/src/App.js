import "./App.css";
import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Form from "./components/Form";
import MovieLists from "./components/MovieLists";
import NavBar from "./components/NavBar";
import MovieDetail from "./components/MovieDetail";
import EditAMovie from "./components/EditAMovie";
import Home from "./components/Home";
import SearchResult from "./components/SearchResult";
import RegistrationForm from "./components/RegistrationForm";
import Login from "./components/Login";

function App() {
  // we have to have searchResults state in App.js to nest its results into the Navbar=>Search and SearchResult components
  const [searchResults, setSerachResults] = useState([]);

  return (
    <div className="App">
      <BrowserRouter>
        <NavBar
          searchResults={searchResults}
          setSerachResults={setSerachResults}
        />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/registration" element={<RegistrationForm />} />
          <Route path="/login" element={<Login />} />

          <Route path="/addMovie" element={<Form />} />
          <Route path="/movieLists" element={<MovieLists />} />
          <Route path="/movieDetail/:id" element={<MovieDetail />} />
          <Route path="/Update-A-Movie/:id" element={<EditAMovie />} />
          <Route
            path="/search-result"
            element={
              <SearchResult
                searchResults={searchResults}
                setSerachResults={setSerachResults}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
