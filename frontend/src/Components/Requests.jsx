import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequest } from "../utils/requestSlice";
import { CheckCircle, XCircle } from "lucide-react";

const Requests = () => {
  const request = useSelector((store) => store.request);
  const dispatch = useDispatch();

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/request/recieved", {
        withCredentials: true,
      });
      dispatch(addRequest(res?.data));
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (!request)
    return <div className="text-white text-center mt-20">Loading...</div>;

  if (request.length === 0)
    return (
      <h1 className="text-3xl font-bold tracking-wide text-center mt-16 mb-4 text-cyan-100">
        You have no requests.
      </h1>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#001f3f] via-[#003f5c] to-[#001f3f] p-6 text-white">
      <h1 className="text-4xl font-bold text-center mb-10 tracking-wider text-cyan-100">
        Requests Received
      </h1>

      <div className="flex justify-center mb-10">
        <label className="input input-bordered bg-[#002b4f] border-cyan-400 flex items-center gap-2 w-full max-w-md shadow-lg rounded-lg px-4 py-2">
          <svg
            className="h-5 w-5 text-cyan-300"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search"
            className="grow outline-none bg-transparent text-cyan-200 placeholder:text-cyan-400"
          />
        </label>
      </div>

      {request.map((requests) => {
        const { _id, firstName, lastName, photoUrl, age, gender, about } =
          requests.fromUser;
        return (
          <div key={_id} className="flex justify-center items-center animate-fade-in-up">
            <div className="card card-side bg-[#012840]/60 backdrop-blur-md border border-cyan-600/30 shadow-2xl rounded-xl w-full max-w-3xl my-6 transition-all duration-300 ease-in-out hover:scale-[1.02]">
              <div className="avatar p-5">
                <div className="w-24 h-24 rounded-full ring ring-cyan-400 ring-offset-2 ring-offset-[#012840] shadow-md">
                  <img src={photoUrl} alt={`${firstName}'s avatar`} />
                </div>
              </div>
              <div className="card-body text-cyan-100">
                <h2 className="card-title text-xl tracking-wide">
                  {firstName + " " + lastName}
                </h2>
                {(gender || age) && (
                  <p className="text-sm italic text-cyan-300">
                    {gender && gender.toUpperCase()}
                    {gender && age && ", "}
                    {age && age}
                  </p>
                )}
                <p className="text-cyan-200">{about}</p>
                <div className="flex flex-wrap justify-center gap-3 p-4 sm:justify-end sm:items-center">
                  <button className="btn w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-semibold flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    Accept
                  </button>
                  <button className="btn w-full sm:w-auto bg-red-600 hover:bg-red-700 text-white font-semibold flex items-center gap-2">
                    <XCircle className="w-5 h-5" />
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Requests;
