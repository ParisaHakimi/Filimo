import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      let response = await axios.post(
        "http://localhost:8000/api/login",
        {
          email,
          password,
        },
        { withCredentials: true }
      );
      let logged = await axios.get("http://localhost:8000/api/getLoggedUser", {
        withCredentials: true,
      });
      console.log(`email is: ${logged.data.email}`);
      localStorage.setItem("getLoggedUser", JSON.stringify(logged.data));
      console.log(`logged in user is: ${logged.data.firstName}`);
      navigate(`/profile-page/${logged.data._id}`);
    } catch (err) {
      console.log(err);
      setErrors(err.response.data.errors);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="container p-4 d-flex align-items-center justify-content-between w-100 signin-container"> 
        <div className="row">
          <form className="col-md-4 mb-3 userForm p-4" onSubmit={submitHandler}>
            <h2 className="mb-3">Sign in</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email ? (
                <span className="text-danger">{errors.email.message}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password ? (
                <span className="text-danger">{errors.password.message}</span>
              ) : null}
            </div>
            <button type="submit" className="btn registerbtn w-100 mt-3">
              Sign in
            </button>
            {/* <hr /> */}
            <div className="divider"><span >New to Filimo?</span></div>
             <Link to="/registration" className="btn reglogBtn w-100">
            Create your Filimo account
          </Link>
            
          </form>
         
          {/* <div className="container d-flex flex-column justify-content-between mt-3 loginLinkContainer">
            <Link to="/registration" className="text-light">
              Don't have an account? Register
            </Link>
            <div className="text-light recruterFriendly">
              Jump in without registration(recruter friendly)
              <p className="text-light recruterPasscode">
                I wanted to showcase the validation abilities of the
                registration and login forms. If you are not interested in
                making a new account, you can use these passcodes instead:
                "Email:tina@email.com", "Password:12345"
              </p>
            </div>
          </div> */}

          <div className="col-md-8 signin-perks ">
            <h1>Benefits of your free Filimo account</h1>
            <p>
              <strong>Personalized Recommendations</strong>
              <br />
              Discover shows you'll love.
            </p>
            <p>
              <strong>Your Watchlist</strong>
              <br />
              Track everything you want to watch and receive e-mail when movies open in theaters.
            </p>
            <p>
              <strong>Your Ratings</strong>
              <br />
              Rate and remember everything you've seen.
            </p>
            <p>
              <strong>Contribute to Filimo</strong>
              <br />
              Add data that will be seen by millions of people and get cool badges.
            </p>
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
