import React from "react";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("shraddha@gmail.com");
  const [password, setPassword] = useState("Shraddha@123");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
      dispatch(addUser(res.data));
      return navigate("/feed");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong.");
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center my-4">
      <div className="card bg-base-200 w-96">
        <div className="card-body">
          <h2 className="card-title justify-center">Login</h2>
          <legend className="fieldset-legend ">Email</legend>
          <input
            type="text"
            value={emailId}
            className="input"
            placeholder="Type here"
            onChange={(e) => setEmailId(e.target.value)}
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
            <button className="btn bg-base-100" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
