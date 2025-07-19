import axios from "axios";
import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Delete = () => {
  const dispatch = useDispatch();
  const [confirmChecked, setConfirmChecked] = useState(false);
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const deleteAccount = async (password) => {
    try {
      const res = await axios.delete(BASE_URL + "/profile/delete", {
        withCredentials: true,
        data: { password },
      });
      dispatch(removeUser());
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      navigate("/login");
      alert(res.data);
    } catch (error) {
      if (error.response && error.response.status === 400) {
        alert(error.response.data);
      } else {
        alert("Something went wrong. Please try again.");
      }
      console.error("Error deleting account:", error);
    }
  };

  const handleDelete = () => {
    if (confirmChecked && password) {
      deleteAccount(password);
      console.log("Deleting account...");
    }
  };

  const isDisabled = !confirmChecked || password.trim() === "";

  return (
    <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 py-8">
      <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl border border-red-200 p-6 sm:p-8">
        <h2 className="text-xl sm:text-2xl font-bold text-red-600 mb-4">
          ⚠️ Delete Your Account
        </h2>
        <p className="text-gray-700 mb-4 leading-relaxed text-sm sm:text-base">
          This action{" "}
          <span className="font-semibold text-red-500">cannot be undone</span>.
          All your data, messages, and connections will be{" "}
          <span className="font-semibold">permanently deleted</span>. You will
          not be able to recover your account.
        </p>

        <div className="flex items-start mb-4">
          <input
            type="checkbox"
            id="confirmDelete"
            className="mt-1 mr-2"
            checked={confirmChecked}
            onChange={(e) => setConfirmChecked(e.target.checked)}
          />
          <label htmlFor="confirmDelete" className="text-sm text-gray-800">
            I understand that deleting my account is permanent and I will lose
            all my data.
          </label>
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Confirm your password
          </label>
          <input
            type="text"
            id="password"
            placeholder="Enter your password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          onClick={handleDelete}
          disabled={isDisabled}
          className={`w-full py-2 mt-2 rounded-lg font-semibold text-white transition 
            ${
              isDisabled
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            }`}
        >
          Delete My Account
        </button>
      </div>
    </div>
  );
};

export default Delete;
