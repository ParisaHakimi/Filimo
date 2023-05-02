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
  // col-xs-12 col-sm-5
  // col-xs-12 col-sm-7
  return (
    <div className="container">
      <div className="row">
        <div className="container p-4"> 
          <form className="col col-sm-5 userForm mx-auto p-4" onSubmit={submitHandler}>
            <h2 className="mb-3">Sign in</h2>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
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
            <div className="divider"><span>New to Filimo?</span></div>
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
        </div>
      </div>
    </div>
  );
};

export default Login;
