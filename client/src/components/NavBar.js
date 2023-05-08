import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Search from "./Search";

const NavBar = ({ searchResults, setSerachResults }) => {
  let activeStyle = { color: "#071c01", "font-weight": "bold" };

  return (
    <nav className="navbar navbar-expand-lg navbar-light nav-bar">
      <div className="container-fluid">
        <NavLink to="/home" className="navbar-brand logo">
          Filimo
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                className="nav-link active navLink"
                aria-current="page"
                to="/home"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Home
              </NavLink>
            </li>
            {/* <li className="nav-item">
              <NavLink
                className="nav-link active navLink"
                aria-current="page"
                to="/addMovie"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Form
              </NavLink>
            </li> */}
            <li className="nav-item">
              <NavLink
                className="nav-link active navLink"
                aria-current="page"
                to="/registration"
                style={({ isActive }) => (isActive ? activeStyle : undefined)}
              >
                Sign In
              </NavLink>
            </li>
          </ul>
          <Search
            searchResults={searchResults}
            setSerachResults={setSerachResults}
          />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
