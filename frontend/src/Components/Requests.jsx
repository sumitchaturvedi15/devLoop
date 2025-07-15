import axios from "axios";
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest, removeRequest } from "../utils/requestSlice";
import { CheckCircle, XCircle } from "lucide-react";

const Requests = () => {
  const dispatch = useDispatch();
  const request = useSelector((store) => store.request);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res.data));
    } catch (err) {
      console.log(err);
    }
  };

  const reviewRequest = async (status, _id) => {
    try {
      await axios.post(
        BASE_URL + "/request/review/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeRequest(_id));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const filteredRequests = request?.filter((req) => {
    const name = `${req.fromUser.firstName} ${req.fromUser.lastName}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  if (!request)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white">
        <p className="text-xl font-medium animate-pulse">Loading requests...</p>
      </div>
    );

  if (request.length === 0)
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-black via-gray-900 to-black text-white px-6 py-10">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-4 text-indigo-100 tracking-tight">
          No Requests Yet
        </h1>
        <p className="text-lg md:text-xl text-indigo-300 text-center">
          You’ll see connection requests appear here.
        </p>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black px-4 py-10 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 text-indigo-200">
        Requests Received
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-indigo-400 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
        />
      </div>

      {/* Requests List */}
      <div className="flex flex-col gap-6 items-center">
        {filteredRequests.length === 0 ? (
          <p className="text-gray-400 text-center">No matching users found.</p>
        ) : (
          filteredRequests.map((requests) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              requests.fromUser;
            return (
              <div
                key={_id}
                className="w-full max-w-3xl bg-white/5 border border-white/10 shadow-lg rounded-xl p-5 flex flex-col sm:flex-row items-center sm:items-start gap-4 backdrop-blur-md hover:scale-[1.01] transition"
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
                  <p className="text-sm text-gray-200 mb-4">{about}</p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <button
                      onClick={() => reviewRequest("accepted", requests._id)}
                      className="px-5 py-2 rounded-full bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Accept
                    </button>
                    <button
                      onClick={() => reviewRequest("rejected", requests._id)}
                      className="px-5 py-2 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold flex items-center justify-center gap-2"
                    >
                      <XCircle size={18} />
                      Decline
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Requests;
