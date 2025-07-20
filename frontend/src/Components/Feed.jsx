// Feed.jsx
import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addFeed } from "../utils/feedSlice";
import UserCard from "./UserCard";
import Info from "./Info";
import ListInfo from "./ListInfo";

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
      // console.error("Feed Fetch Error:", err);
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

  if (feed.length === 0)
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

  const user = feed[0];
  const {
    firstName,
    lastName,
    skills = [],
    about,
    location = user.location||"Not specified",
    university = user.university||"Not specified",
    school = user.school||"Not specified",
    company = user.company||"Not specified",
    internships = [],
    fullTimeJobs = [],
    projects = [],
    github,
    experience = "Not provided",
  } = user;

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800 flex flex-col md:flex-row">
      {/* Left Side */}
      <div className="w-full md:w-1/2 flex flex-col items-center md:items-start p-6 md:p-10 border-b md:border-b-0 md:border-r border-pink-300 text-center md:text-left space-y-6 overflow-y-auto max-h-screen scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-pink-100">
      
        <h1 className="text-4xl font-bold text-pink-700">{`${firstName} ${lastName}`}</h1>

        {/* Info Section */}
        <section className="w-full space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">📌 Details</h2>
          <Info label="🌍 Current Location" value={location} />
          <Info label="🎓 University" value={university} />
          <Info label="🏫 School" value={school} />
          <Info label="🏢 Company" value={company} />
        </section>

        {/* Skills and Jobs */}
        <section className="w-full space-y-3">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">💼 Work & Skills</h2>
          <ListInfo label="🛠 Professional Skills" list={skills} />
          <ListInfo label="🧑‍💻 Internship" list={internships} subTitle />
          <ListInfo label="👨‍💼 Full-Time" list={fullTimeJobs} subTitle />
        </section>

        {/* Projects */}
        <section className="w-full space-y-2">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">🚀 Projects</h2>
          <ListInfo list={projects.slice(0, 3)} isLink />
        </section>

        {/* GitHub */}
        <section className="w-full space-y-1">
          <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">🔗 GitHub</h2>
          {github ? (
            <a
              href={github}
              className="text-blue-600 underline break-words text-sm"
              target="_blank"
              rel="noopener noreferrer"
            >
              {github}
            </a>
          ) : (
            <p className="text-gray-500 italic text-sm">No GitHub Profile</p>
          )}
        </section>

        {/* Experience */}
        {experience && (
          <section className="w-full space-y-1">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">📚 Experience</h2>
            <p className="text-sm text-gray-800">{`${experience} years`}</p>
          </section>
        )}

        {/* About */}
        {about && (
          <section className="w-full space-y-1">
            <h2 className="text-lg font-semibold text-gray-700 border-b pb-1">🧾 About</h2>
            <p className="text-sm text-gray-800">{about}</p>
          </section>
        )}
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex justify-center items-center p-6">
        <div className="w-full max-w-md rounded-xl">
          <UserCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default Feed;
