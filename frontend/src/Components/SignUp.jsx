import React, { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const SignUp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signUp",
        { firstName, lastName, email, password },
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
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800 flex items-center justify-center px-4">
      <div className="w-full max-w-sm bg-white/60 backdrop-blur-md rounded-xl p-8 shadow-xl border border-pink-300">
        <h2 className="text-3xl font-bold text-pink-700 text-center mb-6">
          Sign Up
        </h2>

        <label className="block text-sm text-pink-600 mb-1">First Name</label>
        <input
          type="text"
          value={firstName}
          className="w-full bg-white text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
          placeholder="Enter your first name"
          onChange={(e) => setFirstName(e.target.value)}
        />

        <label className="block text-sm text-pink-600 mb-1">Last Name</label>
        <input
          type="text"
          value={lastName}
          className="w-full bg-white text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
          placeholder="Enter your last name"
          onChange={(e) => setLastName(e.target.value)}
        />

        <label className="block text-sm text-pink-600 mb-1">Email</label>
        <input
          type="email"
          value={email}
          className="w-full bg-white text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block text-sm text-pink-600 mb-1">Password</label>
        <input
          type="text"
          value={password}
          className="w-full bg-white text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
          placeholder="Create a password"
          onChange={(e) => setPassword(e.target.value)}
        />

        {error && (
          <div className="text-red-500 text-sm text-center mb-4">{error}</div>
        )}

        <button
          className="w-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 transition text-white font-semibold py-2 rounded-md shadow-md"
          onClick={handleSignUp}
        >
          Sign Up
        </button>

        <div className="text-center mt-6 text-sm text-gray-700">
          Already a user?{" "}
          <Link
            to="/login"
            className="text-blue-600 hover:underline font-medium"
          >
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
