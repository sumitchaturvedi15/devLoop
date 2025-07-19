import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800 px-4">
      <div className="w-full max-w-sm bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-pink-300">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">Login</h2>

        <label className="block text-sm text-pink-600 mb-1">Email</label>
        <input
          type="email"
          value={emailId}
          onChange={(e) => setEmailId(e.target.value)}
          placeholder="Enter your email"
          className="w-full bg-white text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
        />

        <label className="block text-sm text-pink-600 mb-1">Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full bg-white text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
        />

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 transition text-white font-semibold py-2 rounded-md shadow-md"
        >
          Login
        </button>

        <div className="text-center mt-6 text-sm text-gray-700">
          New user?{" "}
          <Link
            to="/signUp"
            className="text-blue-600 hover:underline font-medium"
          >
            Sign up here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
