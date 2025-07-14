import axios from "axios";
import React from "react";
import { useDispatch } from "react-redux";
import { removeFeed } from "../utils/feedSlice";
import { BASE_URL } from "../utils/constants";

const UserCard = ({ user }) => {
  const {
    firstName,
    lastName,
    photoUrl,
    skills,
    languages,
    about,
    gender,
    age,
    height,
  } = user;

  const dispatch = useDispatch();
  const handleSendRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/sent/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="relative w-full max-w-[400px] aspect-[3/4] sm:aspect-[3/5] md:aspect-[2/3] rounded-3xl shadow-2xl overflow-hidden bg-black group transition-transform hover:scale-[1.02] duration-300">
      <img
        src={photoUrl}
        alt="feedPhoto"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent p-4 sm:p-6 flex flex-col justify-end text-white">
        <h2 className="text-xl sm:text-2xl font-bold mb-1">
          {firstName + " " + lastName}
        </h2>
        {age && gender && (
          <p className="text-sm sm:text-base mb-2 opacity-80">
            {age + " years, " + gender.toUpperCase()}
          </p>
        )}
        {Array.isArray(languages) && languages.length > 0 && (
          <p className="mb-2 text-sm sm:text-base">
            <span className="font-semibold">Languages: </span>
            {languages.map((e, i) => (
              <span
                key={i}
                className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium mr-1"
              >
                {e.toUpperCase()}
              </span>
            ))}
          </p>
        )}
        {about && (
          <p className="text-sm mb-3 text-white/90 leading-relaxed max-h-[60px] overflow-hidden">
            {about}
          </p>
        )}
        {Array.isArray(skills) && skills.length > 0 && (
          <p className="mb-2 text-sm sm:text-base">
            <span className="font-semibold">Skills: </span>
            {skills.map((e, i) => (
              <span
                key={i}
                className="inline-block bg-white/20 rounded-full px-3 py-1 text-xs sm:text-sm font-medium mr-1"
              >
                {e.toUpperCase()}
              </span>
            ))}
          </p>
        )}
        {height && (
          <p className="text-sm sm:text-base mb-4">
            <span className="font-semibold">Height:</span> {height} cm
          </p>
        )}

        <div className="flex flex-wrap gap-3 mt-2">
          <button
            className="flex-1 bg-gradient-to-r from-purple-800 to-fuchsia-600 text-white font-semibold px-4 py-2 rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-transform duration-200 shadow-lg"
            onClick={() => handleSendRequest("interested", user._id)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>
            Like
          </button>
          <button
            className="flex-1 bg-gradient-to-r from-rose-600 to-rose-800 text-white font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
            onClick={() => handleSendRequest("ignored", user._id)}
          >
            Ignore
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
