import React from "react";
import { useState } from "react";
import axios from "axios"
const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin= async()=>{
    await axios.post("link",{
        emailId, password
    })
  }

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
            onChange={(e)=> setPassword(e.target.password)}
          />
          <div className="card-actions justify-center my-2">
            <button className="btn" onClick={handleLogin}>Login</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
