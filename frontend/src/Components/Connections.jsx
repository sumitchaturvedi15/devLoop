import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

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
      console.log("Error while fetching connections", err);
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
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <h1 className="text-xl font-medium animate-pulse">Loading...</h1>
      </div>
    );

  if (connections.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <h1 className="text-3xl font-bold text-center">No Connections Yet</h1>
      </div>
    );

  const visibleConnections = filtered.slice(0, visibleCount);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10">Your Connections</h1>

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
          className="w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-indigo-500 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-600 transition"
        />
      </div>

      <div className="flex flex-col gap-6 items-center">
        {visibleConnections.map(({ _id, firstName, lastName, photoUrl, age, gender, about }) => (
          <div
            key={_id}
            className="w-full max-w-3xl bg-white/5 border border-white/10 shadow-lg rounded-xl p-4 flex flex-col sm:flex-row items-center sm:items-start gap-4 backdrop-blur-md hover:scale-[1.01] transition"
          >
            <img
              src={photoUrl}
              alt={firstName}
              className="w-24 h-24 rounded-full object-cover ring-2 ring-indigo-500"
            />
            <div className="flex-1 text-center sm:text-left">
              <h2 className="text-xl font-semibold text-indigo-300">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-gray-300 italic mb-1">
                {gender?.toUpperCase()}
                {gender && age && ", "}
                {age && `${age} years old`}
              </p>
              <p className="text-sm text-gray-200">{about}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-gray-400 mt-6 text-center">No matching profiles found.</p>
        )}
      </div>

      {filtered.length > 4 && (
        <div className="flex justify-center mt-8">
          {visibleCount < filtered.length ? (
            <button
              onClick={handleExpand}
              className="px-6 py-2 bg-indigo-600 hover:bg-indigo-700 rounded-full text-white font-semibold transition"
            >
              Show More ↓
            </button>
          ) : (
            <button
              onClick={handleCollapse}
              className="px-6 py-2 bg-rose-600 hover:bg-rose-700 rounded-full text-white font-semibold transition"
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
