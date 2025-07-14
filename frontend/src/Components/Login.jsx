import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
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
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white flex items-center justify-center px-4">
      <div className="card bg-base-200 bg-opacity-10 backdrop-blur-md shadow-xl border border-indigo-500 w-full max-w-sm rounded-xl">
        <div className="card-body">
          <h2 className="card-title justify-center text-indigo-300 text-2xl font-bold mb-4">
            Login
          </h2>

          <label className="label text-sm text-indigo-200">Email</label>
          <input
            type="email"
            value={emailId}
            className="input input-bordered bg-black/30 text-white placeholder-gray-400 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your email"
            onChange={(e) => setEmailId(e.target.value)}
          />

          <label className="label text-sm text-indigo-200 mt-4">Password</label>
          <input
            type="password"
            value={password}
            className="input input-bordered bg-black/30 text-white placeholder-gray-400 border-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="mt-3 text-red-400 text-sm text-center">{error}</div>
          )}

          <div className="card-actions justify-center mt-6">
            <button
              className="btn bg-gradient-to-r from-indigo-700 to-purple-600 text-white font-semibold hover:scale-105 transition-transform shadow-md"
              onClick={handleLogin}
            >
              Login
            </button>
          </div>

          <div className="text-center mt-6 text-sm text-gray-300">
            New user?{" "}
            <Link
              to="/signUp"
              className="text-indigo-400 hover:underline font-medium"
            >
              Sign up here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
