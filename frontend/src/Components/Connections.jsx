import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const dispatch = useDispatch();
  const connections = useSelector((store) => store.connections);
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data));
    } catch (err) {
      console.log("Error while fetching connections" + err);
    }
  };
  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return <div>Loading...</div>;
  if (connections.length === 0)
    return (
      <h1 className="text-3xl font-bold tracking-wide text-center mt-6 mb-4">
        You have no connections.
      </h1>
    );

  return (
    <div className="min-h-screen bg-base p-4">
      <h1 className="text-4xl font-bold text-center mb-6 tracking-wide">
        Your Connections
      </h1>

      <div className="flex justify-center mb-6">
        <label className="input input-bordered flex items-center gap-2 w-full max-w-md shadow-md rounded-md">
          <svg
            className="h-5 w-5 opacity-50"
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
            className="grow outline-none"
          />
        </label>
      </div>

      {connections.map((connection) => {
        const { _id,firstName, lastName, photoUrl, age, gender, about } =
          connection;
        return (
          <div key={_id} className="flex justify-center animate-fade-in-up">
            <div className="card card-side bg-base hover:bg-base-200 shadow-xl rounded-xl w-full max-w-3xl my-4 transition-all duration-300 ease-in-out">
              <div className="avatar p-4">
                <div className="w-24 h-24 rounded-full ring ring-fuchsia-500 ring-offset-base-100 ring-offset-2 shadow-md">
                  <img src={photoUrl} alt={`${firstName}'s avatar`} />
                </div>
              </div>
              <div className="card-body">
                <h2 className="card-title ">
                  {firstName + " " + lastName}
                </h2>
                {(gender || age) && (
                  <p className="text-sm italic">
                    {gender && gender.toUpperCase()}
                    {gender && age && ", "}
                    {age && age}
                  </p>
                )}
                <p >{about}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Connections;
