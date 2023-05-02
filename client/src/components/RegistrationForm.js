import axios from "axios";
import React, { useState } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";

const RegistrationForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { id } = useParams();

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/api/register",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
        },
        { withCredentials: true, credentials: "include" }
      )
      .then((res) => {
        console.log(res.data);
        navigate(`/profile-page/${id}`);
      })
      .catch((err) => {
        console.log(err);
        setErrors(err.response.data.errors);
      });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="container p-4">
          <form
            className="col col-sm-5 userForm mx-auto p-4"
            onSubmit={submitHandler}
          >
            <h2 className="mb-3">Create Acoount</h2>
            <div className="mb-3">
              <label htmlFor="fName" className="form-label">
                First Name *
              </label>
              <input
                type="text"
                className="form-control"
                id="fName"
                autoComplete="off"
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName ? (
                <span className="text-danger">{errors.firstName.message}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="lname" className="form-label">
                Last name *
              </label>
              <input
                type="text"
                className="form-control"
                id="lName"
                autoComplete="off"
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName ? (
                <span className="text-danger">{errors.lastName.message}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address *
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email ? (
                <span className="text-danger">{errors.email.message}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password *
              </label>
              <input
                type="text"
                className="form-control"
                id="password"
                autoComplete="off"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
              {errors.password ? (
                <span className="text-danger">{errors.password.message}</span>
              ) : null}
            </div>
            <div className="mb-3">
              <label
                htmlFor="ConfirmPassword"
                className="form-label"
              >
                Confirm Password *
              </label>
              <input
                type="text"
                className="form-control"
                id="ConfirmPassword"
                autoComplete="off"
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
              {errors.password ? (
                <span className="text-danger">{errors.password.message}</span>
              ) : null}
            </div>
            <div className="mb-3">* required items</div>
            <button type="submit" className="btn registerbtn w-100 mb-3">
              Create your Filimo acoount
            </button>
            <hr />
            <Link to="/login" className="btn reglogBtn w-100">
            Already have an account? Log in
          </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;
