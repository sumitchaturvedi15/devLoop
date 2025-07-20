import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const [searchTerm, setSearchTerm] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [visibleCount, setVisibleCount] = useState(4);

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      // console.log("Error while fetching connections", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  useEffect(() => {
    if (!connections) return;
    const term = searchTerm.toLowerCase();
    const result = connections.filter((conn) =>
      `${conn.firstName} ${conn.lastName}`.toLowerCase().includes(term)
    );
    setFiltered(result);
  }, [searchTerm, connections]);

  const handleExpand = () => {
    setVisibleCount((prev) => prev + 4);
  };

  const handleCollapse = () => {
    setVisibleCount(4);
  };

  if (!connections)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900">
        <h1 className="text-xl font-medium animate-pulse">Loading...</h1>
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900">
        <h1 className="text-3xl font-bold text-center">No Connections Yet</h1>
      </div>
    );

  const visibleConnections = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-lg">Your Connections</h1>

      {/* Search Box */}
      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(4);
          }}
          className="w-full px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-pink-400 placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />
      </div>

      <div className="flex flex-col gap-6 items-center">
        {visibleConnections.map(
          ({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
            <div
              key={_id}
              className="w-full max-w-3xl bg-white/40 border border-white/30 shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 backdrop-blur-md hover:scale-[1.01] transition"
            >
              <img
                src={photoUrl}
                alt={firstName}
                className="w-24 h-24 rounded-full object-cover ring-4 ring-pink-400 shadow-md"
              />
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-2xl font-bold text-pink-600">{firstName} {lastName}</h2>
                <p className="text-sm text-gray-700 italic mb-1">
                  {gender?.toUpperCase()}
                  {gender && age && ", "}
                  {age && `${age} years old`}
                </p>
                <p className="text-sm text-gray-800">{about}</p>
              </div>

              <Link to={"/chat/" + _id}>
                <button className="btn bg-green-500 hover:bg-green-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition flex items-center gap-2">
                  <svg
                    aria-label="WeChat logo"
                    width="16"
                    height="16"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 32 32"
                  >
                    <g fill="white">
                      <path d="M11.606,3.068C5.031,3.068,0,7.529,0,12.393s4.344,7.681,4.344,7.681l-.706,2.676c-.093,.353,.284,.644,.602,.464l3.173-1.798c1.403,.447,4.381,.59,4.671,.603-.208-.721-.311-1.432-.311-2.095,0-3.754,3.268-9.04,10.532-9.04,.165,0,.331,.004,.496,.011-.965-4.627-5.769-7.827-11.195-7.827Zm-4.327,7.748c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Zm8.386,0c-.797,0-1.442-.646-1.442-1.442s.646-1.442,1.442-1.442,1.442,.646,1.442,1.442-.646,1.442-1.442,1.442Z"></path>
                      <path d="M32,19.336c0-4.26-4.998-7.379-9.694-7.379-6.642,0-9.459,4.797-9.459,7.966s2.818,7.966,9.459,7.966c1.469,0,2.762-.211,3.886-.584l2.498,1.585c.197,.125,.447-.052,.394-.279l-.567-2.46c2.36-1.643,3.483-4.234,3.483-6.815Zm-12.73-.81c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275c0,.705-.571,1.275-1.275,1.275Zm6.373,0c-.704,0-1.275-.571-1.275-1.275s.571-1.275,1.275-1.275,1.275,.571,1.275,1.275-.571,1.275-1.275,1.275Z"></path>
                    </g>
                  </svg>
                  Chat
                </button>
              </Link>
            </div>
          )
        )}

        {filtered.length === 0 && (
          <p className="text-gray-600 mt-6 text-center">
            No matching profiles found.
          </p>
        )}
      </div>

      {filtered.length > 4 && (
        <div className="flex justify-center mt-8">
          {visibleCount < filtered.length ? (
            <button
              onClick={handleExpand}
              className="px-6 py-2 bg-pink-500 hover:bg-pink-600 rounded-full text-white font-semibold transition"
            >
              Show More ↓
            </button>
          ) : (
            <button
              onClick={handleCollapse}
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 rounded-full text-white font-semibold transition"
            >
              Show Less ↑
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Connections;
