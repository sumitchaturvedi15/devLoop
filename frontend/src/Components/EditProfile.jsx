import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import MyCard from "./MyCard";

const EditProfile = ({ user }) => {
  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [gender, setGender] = useState(user.gender);
  const [age, setAge] = useState(user.age || "");
  const [height, setHeight] = useState(user.height || "");
  const [photoUrl, setPhotoUrl] = useState(user.photoUrl);
  const [skills, setSkills] = useState(user.skills || "");
  const [languages, setLanguages] = useState(user.languages || "");
  const [about, setAbout] = useState(user.about || "");
  const dispatch = useDispatch();
  const [setToast, boolToast] = useState(false);

  const saveProfile = async () => {
    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        {
          firstName,
          lastName,
          gender,
          age: parseInt(age),
          height: parseInt(height),
          photoUrl,
          skills: Array.isArray(skills) ? skills : skills.split(",").map((s) => s.trim()),
          languages: Array.isArray(languages) ? languages : languages.split(",").map((l) => l.trim()),
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      boolToast(true);
      setTimeout(() => {
        boolToast(false);
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full min-h-screen bg-gradient-to-tr from-pink-50 via-purple-100 to-pink-50">
      <div className="card bg-base-300 shadow-lg flex flex-col items-center p-8 space-y-5 w-full lg:w-1/2 rounded-none min-h-screen">
        <h2 className="text-3xl  mb-2">Edit Profile</h2>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">First Name:</legend>
          <input
            type="text"
            value={firstName}
            className="input input-bordered w-full rounded-md"
            placeholder={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Last Name:</legend>
          <input
            type="text"
            value={lastName}
            className="input input-bordered w-full rounded-md"
            placeholder="Type here"
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Gender:</legend>
          <select
            className="select select-bordered w-full rounded-md"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Age:</legend>
          <input
            value={age}
            type="number"
            className="input input-bordered w-full rounded-md"
            required
            placeholder="Age"
            min="18"
            max="150"
            title="Enter your age"
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Height:</legend>
          <input
            value={height}
            type="number"
            className="input input-bordered w-full rounded-md"
            required
            placeholder="Height"
            min="100"
            max="500"
            title="Enter your height (cms)"
            onChange={(e) => setHeight(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Profile Picture:</legend>
          <input
            value={photoUrl}
            type="url"
            className="input input-bordered w-full rounded-md"
            placeholder="Profile Picture"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Skills:</legend>
          <input
            value={Array.isArray(skills) ? skills.join(", ") : skills}
            type="text"
            className="input input-bordered w-full rounded-md"
            placeholder="Skills (comma separated)"
            onChange={(e) => setSkills(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">Language:</legend>
          <input
            value={Array.isArray(languages) ? languages.join(", ") : languages}
            type="text"
            className="input input-bordered w-full rounded-md"
            placeholder="Languages"
            onChange={(e) => setLanguages(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-4/5">
          <legend className="text-sm text-gray-600">About You:</legend>
          <textarea
            value={about}
            className="textarea textarea-bordered w-full rounded-md"
            placeholder="Bio"
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </fieldset>

        <fieldset className="w-4/5 mb-2">
          <button className="btn btn-wide w-full px-2 bg-base  hover:bg-fuchsia-800" onClick={saveProfile}>
            Update Profile
          </button>
        </fieldset>

        {setToast && (
          <div className="toast toast-top toast-start">
            <div className="alert alert-success">
              <span>Profile Updated Successfully.</span>
            </div>
          </div>
        )}
      </div>

      <div className="card bg-black shadow-lg flex items-center justify-center w-full lg:w-1/2 rounded-none min-h-screen">
        <MyCard
          user={{
            firstName,
            lastName,
            photoUrl,
            skills: Array.isArray(skills) ? skills : skills.split(",").map((s) => s.trim()),
            languages: Array.isArray(languages) ? languages : languages.split(",").map((l) => l.trim()),
            about,
            gender,
            age,
            height,
          }}
        />
      </div>
    </div>
  );
};

export default EditProfile;