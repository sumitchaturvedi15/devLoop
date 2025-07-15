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
  const [toast, setToast] = useState(false);
  const dispatch = useDispatch();

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
          skills: Array.isArray(skills)
            ? skills
            : skills.split(",").map((s) => s.trim()),
          languages: Array.isArray(languages)
            ? languages
            : languages.split(",").map((l) => l.trim()),
          about,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Form Section */}
      <div className="flex flex-col items-center p-6 sm:p-8 gap-6 w-full lg:w-3/5 border-b lg:border-b-0 lg:border-r border-gray-800 overflow-y-auto max-h-screen">
        <h2 className="text-3xl font-bold text-indigo-400 mb-2">Edit Profile</h2>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">First Name:</legend>
          <input
            type="text"
            value={firstName}
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Last Name:</legend>
          <input
            type="text"
            value={lastName}
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Gender:</legend>
          <select
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Age:</legend>
          <input
            value={age}
            type="number"
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Age"
            min="18"
            max="150"
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Height (cm):</legend>
          <input
            value={height}
            type="number"
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Height"
            min="100"
            max="500"
            onChange={(e) => setHeight(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Profile Picture URL:</legend>
          <input
            value={photoUrl}
            type="url"
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Profile Picture URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Skills (comma separated):</legend>
          <input
            value={Array.isArray(skills) ? skills.join(", ") : skills}
            type="text"
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Skills"
            onChange={(e) => setSkills(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">Languages:</legend>
          <input
            value={Array.isArray(languages) ? languages.join(", ") : languages}
            type="text"
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Languages"
            onChange={(e) => setLanguages(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-gray-400 mb-1">About You:</legend>
          <textarea
            value={about}
            className="w-full bg-gray-800 text-white rounded-md px-4 py-2 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-600"
            placeholder="Tell us about yourself..."
            rows={4}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </fieldset>

        <fieldset className="w-full max-w-md mt-2">
          <button
            className="w-full bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold py-2 rounded-md shadow-md"
            onClick={saveProfile}
          >
            Update Profile
          </button>
        </fieldset>

        {toast && (
          <div className="toast toast-top toast-start">
            <div className="alert alert-success shadow-lg bg-green-700 text-white">
              <span>Profile Updated Successfully.</span>
            </div>
          </div>
        )}
      </div>

      {/* My Card Section */}
      <div className="bg-black flex items-center justify-center w-full lg:w-2/5 p-6 sm:p-8">
        <div className="w-full max-w-md bg-gray-900/60 rounded-xl p-6 shadow-lg border border-gray-700">
          <MyCard
            user={{
              firstName,
              lastName,
              photoUrl,
              skills: Array.isArray(skills)
                ? skills
                : skills.split(",").map((s) => s.trim()),
              languages: Array.isArray(languages)
                ? languages
                : languages.split(",").map((l) => l.trim()),
              about,
              gender,
              age,
              height,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
