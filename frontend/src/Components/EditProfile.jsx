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
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800">
      {/* Form Section */}
      <div className="flex flex-col items-center p-6 sm:p-8 gap-6 w-full lg:w-3/5 border-b lg:border-b-0 lg:border-r border-pink-300 overflow-y-auto max-h-screen">
        <h2 className="text-3xl font-bold text-pink-700 mb-2">Edit Profile</h2>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">First Name:</legend>
          <input
            value={firstName}
            type="text"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder={user.firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Last Name:</legend>
          <input
            value={lastName}
            type="text"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Age:</legend>
          <input
            value={age}
            type="number"
            min="18"
            max="150"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Age"
            onChange={(e) => setAge(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Height (cm):</legend>
          <input
            value={height}
            type="number"
            min="100"
            max="500"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Height"
            onChange={(e) => setHeight(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Profile Picture URL:</legend>
          <input
            value={photoUrl}
            type="url"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Profile Picture URL"
            onChange={(e) => setPhotoUrl(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Skills (comma separated):</legend>
          <input
            value={Array.isArray(skills) ? skills.join(", ") : skills}
            type="text"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Skills"
            onChange={(e) => setSkills(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Languages:</legend>
          <input
            value={Array.isArray(languages) ? languages.join(", ") : languages}
            type="text"
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Languages"
            onChange={(e) => setLanguages(e.target.value)}
          />
        </fieldset>

        <fieldset className="w-full max-w-md">
          <legend className="text-sm text-pink-600 mb-1">Gender:</legend>
          <select
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
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
          <legend className="text-sm text-pink-600 mb-1">About You:</legend>
          <textarea
            value={about}
            className="w-full bg-white/50 backdrop-blur-md text-gray-800 rounded-md px-4 py-2 border border-pink-300 focus:outline-none focus:ring-2 focus:ring-pink-400"
            placeholder="Tell us about yourself..."
            rows={4}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </fieldset>

        <fieldset className="w-full max-w-md mt-2">
          <button
            className="w-full bg-gradient-to-r from-pink-400 to-blue-400 hover:from-pink-500 hover:to-blue-500 transition text-white font-semibold py-2 rounded-md shadow-md"
            onClick={saveProfile}
          >
            Update Profile
          </button>
        </fieldset>

        {toast && (
          <div className="toast toast-top toast-start">
            <div className="alert alert-success shadow-lg bg-green-600 text-white">
              <span>Profile Updated Successfully.</span>
            </div>
          </div>
        )}
      </div>

      {/* My Card Section */}
      <div className="flex items-center justify-center w-full lg:w-2/5 p-6 sm:p-8 bg-gradient-to-br from-pink-100/40 to-blue-100/40">
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
  );
};

export default EditProfile;
