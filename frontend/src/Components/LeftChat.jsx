import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";

const LeftChat = ({ onSelect, selectedConnection }) => {
  const [connections, setConnections] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchConnections = async () => {
      try {
        const res = await axios.get(BASE_URL + "/user/connections", {
          withCredentials: true,
        });
        setConnections(res.data);
      } catch (error) {
        console.error("Error fetching connections:", error);
      }
    };

    fetchConnections();
  }, []);

  const filteredConnections = connections.filter((conn) =>
    `${conn.firstName} ${conn.lastName}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 shadow-xl rounded-2xl overflow-hidden border border-purple-200">
      
      <div className="p-3 border-b bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900">
        <input
          type="text"
          placeholder="Search connections..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 text-sm bg-white border border-purple-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
      </div>

      {/* Connections List */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-300 scrollbar-track-purple-100 px-2 py-1">
        {filteredConnections.length === 0 ? (
          <p className="text-gray-500 text-center p-4 italic">
            No connections found.
          </p>
        ) : (
          filteredConnections.map((conn) => (
            <div
              key={conn._id}
              onClick={() => onSelect(conn)}
              className={`flex items-center gap-4 p-3 my-1 cursor-pointer transition-all duration-200 rounded-xl ${
                selectedConnection?._id === conn._id
                  ? "bg-purple-200 ring-2 ring-purple-400 shadow-md"
                  : "hover:bg-purple-100"
              }`}
            >
              <img
                src={conn.photoUrl || "/default-avatar.png"}
                alt="avatar"
                className="w-10 h-10 rounded-full object-cover border border-purple-200 shadow"
              />
              <div className="flex flex-col">
                <span className="font-semibold text-sm text-gray-800">
                  {conn.firstName} {conn.lastName}
                </span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LeftChat;
