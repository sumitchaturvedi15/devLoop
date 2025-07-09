import React from "react";
import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [emailId, setEmailId] = useState("shraddha@gmail.com");
  const [password, setPassword] = useState("Shraddha@123");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/login",
        {
          email: emailId,
          password: password,
        },
        {
          withCredentials: true,
        }
      );
    } catch (err) {
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
