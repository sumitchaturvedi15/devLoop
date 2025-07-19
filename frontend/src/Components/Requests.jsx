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
    const name =
      `${req.fromUser.firstName} ${req.fromUser.lastName}`.toLowerCase();
    return name.includes(searchTerm.toLowerCase());
  });

  if (!request)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900">
        <h1 className="text-xl font-medium animate-pulse">Loading requests...</h1>
      </div>
    );

  if (request.length === 0)
    return (
      <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900">
        <h1 className="text-3xl font-bold text-center">No Requests Yet</h1>
      </div>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 text-gray-900 px-4 py-10">
      <h1 className="text-4xl font-bold text-center mb-10 drop-shadow-lg">
        Requests Received
      </h1>

      <div className="max-w-md mx-auto mb-8">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-2 rounded-full bg-white/30 backdrop-blur-sm border border-pink-400 placeholder-gray-700 text-gray-900 focus:outline-none focus:ring-2 focus:ring-pink-500 transition"
        />
      </div>

      <div className="flex flex-col gap-6 items-center">
        {filteredRequests.length === 0 ? (
          <p className="text-gray-600 mt-6 text-center">No matching users found.</p>
        ) : (
          filteredRequests.map((requests) => {
            const { _id, firstName, lastName, photoUrl, age, gender, about } =
              requests.fromUser;

            return (
              <fieldset
                key={_id}
                className="w-full max-w-3xl bg-white/40 border border-white/30 shadow-xl rounded-2xl p-6 flex flex-col sm:flex-row items-center sm:items-start gap-6 backdrop-blur-md hover:scale-[1.01] transition"
              >
                <legend className="sr-only">{firstName} {lastName}</legend>
                <img
                  src={photoUrl}
                  alt={firstName}
                  className="w-24 h-24 rounded-full object-cover ring-4 ring-pink-400 shadow-md"
                />
                <div className="flex-1 text-center sm:text-left">
                  <h2 className="text-2xl font-bold text-pink-600">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-sm text-gray-700 italic mb-1">
                    {gender?.toUpperCase()}
                    {gender && age && ", "}
                    {age && `${age} years old`}
                  </p>
                  <p className="text-sm text-gray-800 mb-4">{about}</p>

                  <div className="flex flex-col sm:flex-row gap-3 justify-center sm:justify-start">
                    <button
                      onClick={() => reviewRequest("accepted", requests._id)}
                      className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2"
                    >
                      <CheckCircle size={18} />
                      Accept
                    </button>
                    <button
                      onClick={() => reviewRequest("rejected", requests._id)}
                      className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white font-semibold rounded-lg shadow-md transition flex items-center gap-2"
                    >
                      <XCircle size={18} />
                      Decline
                    </button>
                  </div>
                </div>
              </fieldset>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Requests;
