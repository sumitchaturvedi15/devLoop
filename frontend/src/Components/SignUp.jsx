import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        {
          firstName,
          lastName,
          email,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">SignUp</h2>
          <legend className="fieldset-legend">First Name:</legend>
          <input
            type="text"
            value={firstName}
            className="input"
            placeholder="Type here"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <legend className="fieldset-legend">Last Name:</legend>
          <input
            type="text"
            value={lastName}
            className="input"
            placeholder="Type here"
            onChange={(e) => setLastName(e.target.value)}
          />
          <legend className="fieldset-legend ">Email</legend>
          <input
            type="text"
            value={email}
            className="input"
            placeholder="Type here"
            onChange={(e) => setEmail(e.target.value)}
          />
          <legend className="fieldset-legend">Password</legend>
          <input
            type="text"
            value={password}
            className="input"
            placeholder="Type here"
            onChange={(e) => setPassword(e.target.value)}
          />
          <div role="alert" className="bg-base-200">
            <span className="text-red-500">{error}</span>
          </div>
          <div className="card-actions justify-center my-2 ">
            <button className="btn bg-base-100" onClick={handleSignUp}>
              SignUp
            </button>
          </div>
          <div className="text-center mt-4 text-sm">
            Already User?{" "}
            <Link
              to="/login"
              className="text-blue-500 hover:underline font-medium p-2"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
