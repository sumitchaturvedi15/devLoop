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
    try{
        await axios.post(
        BASE_URL + "/request/sent/" + status + "/" + _id,
        {},
        { withCredentials: true }
      );
      dispatch(removeFeed(_id));
    }
    catch(err){
      console.log(err);
    }
  };

  return (
    <div className="card-lg bg-pink-600 w-96 shadow-sm">
      <figure>
        <img src={photoUrl} alt="feedPhoto" />
      </figure>
      <div className="card-body">
        <h2 className="card-title">{firstName + " " + lastName}</h2>
        {age && gender && <p>{age + ", " + gender.toUpperCase()}</p>}
        {Array.isArray(languages) && languages.length > 0 && (
          <p>
            LANGUAGES:&nbsp;
            {languages.map((e, i) => (
              <span key={i}>{e.toUpperCase()} </span>
            ))}
          </p>
        )}
        {about && <p>{about}</p>}
        {Array.isArray(skills) && skills.length > 0 && (
          <p>
            SKILLS:&nbsp;
            {skills.map((e, i) => (
              <span key={i}>{e.toUpperCase()} </span>
            ))}
          </p>
        )}
        {height && <p>HEIGHT: {height + " cms"}</p>}
        <div className="flex justify-evenly my-4">
          <button className="btn bg-fuchsia-900" onClick={()=>handleSendRequest("interested",user._id)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="2.5"
              stroke="currentColor"
              className="size-[1.2em]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
              />
            </svg>

            Like
          </button>
          <button className="btn bg-rose-700" onClick={()=>handleSendRequest("ignored",user._id)}>Ignore</button>
        </div>
      </div>
    </div>
  );
};

export default UserCard;
