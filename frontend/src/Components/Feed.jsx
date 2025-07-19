import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";

const Feed = () => {
  const feed = useSelector((store) => store.feed);
  const dispatch = useDispatch();

  const getFeed = async () => {
    if (feed && feed.length > 0) return;
    try {
      const res = await axios.get(BASE_URL + "/feed", {
        withCredentials: true,
      });
      dispatch(addFeed(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getFeed();
  }, []);

  if (!feed)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800">
        <h1 className="text-2xl font-semibold animate-pulse">
          Loading your feed...
        </h1>
      </div>
    );

  if (feed.length <= 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800 text-center px-6">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">
          🎉 You're all caught up!
        </h1>
        <p className="text-base md:text-lg opacity-80 mb-4">
          No more profiles to view right now.
        </p>
        <button
          onClick={getFeed}
          className="mt-4 px-6 py-2 rounded-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 transition text-white font-semibold shadow-md"
        >
          Refresh Feed ↻
        </button>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800 flex flex-col md:flex-row">
      {/* Update Section */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center p-6 md:p-10 border-b md:border-b-0 md:border-r border-pink-300 text-center md:text-left">
        <h1 className="text-3xl font-bold text-pink-700 mb-4">Welcome to the Feed</h1>
        <div className="text-base md:text-lg text-gray-800 mb-6 max-w-md">
          <p className="mb-3">
            I am currently working on adding more features to enhance the platform:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-left">
            <li>Real-time chat section for matched connections.</li>
            <li>Dedicated section to highlight work experience.</li>
            <li>Projects section to showcase completed and ongoing projects.</li>
            <li>Secure user authentication and access control.</li>
          </ul>
        </div>
      </div>

      {/* User Feed Card */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6 ">
        <div className="w-full max-w-md rounded-xl ">
          <UserCard user={feed[0]} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
