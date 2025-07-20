import React, { useState } from "react";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import MyCard from "./MyCard";
import { Link } from "react-router-dom";

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
  const [location, setLocation] = useState(user.location || "");
  const [university, setUniversity] = useState(user.university || "");
  const [school, setSchool] = useState(user.school || "");
  const [company, setCompany] = useState(user.company || "");
  const [internships, setInternships] = useState(user.internships || "");
  const [fullTimeJobs, setFullTimeJobs] = useState(user.fullTimeJobs || "");
  const [projects, setProjects] = useState(user.projects || "");
  const [github, setGithub] = useState(user.github || "");
  const [experience, setExperience] = useState(user.experience || "");

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
          location,
          university,
          school,
          company,
          internships: Array.isArray(internships)
            ? internships
            : internships.split(",").map((i) => i.trim()),
          fullTimeJobs: Array.isArray(fullTimeJobs)
            ? fullTimeJobs
            : fullTimeJobs.split(",").map((j) => j.trim()),
          projects: Array.isArray(projects)
            ? projects
            : projects
                .split(",")
                .map((p) => p.trim())
                .slice(0, 3),
          github,
          experience: parseInt(experience),
        },
        { withCredentials: true }
      );
      dispatch(addUser(res?.data?.user));
      setToast(true);
      setTimeout(() => setToast(false), 3000);
    } catch (err) {
      console.error("Error updating profile:", err);
      alert("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col lg:flex-row w-full h-screen overflow-hidden bg-gradient-to-br from-pink-200 to-blue-200 text-gray-800">
      {/* Form Section */}
      <div className="flex flex-col items-center p-6 sm:p-8 gap-6 w-full lg:w-3/5 border-b lg:border-b-0 lg:border-r border-pink-300 overflow-y-auto max-h-screen bg-white/40 backdrop-blur-lg">
        <h2 className="text-3xl font-bold text-pink-700 mb-4">Edit Profile</h2>

        <div className="w-full max-w-2xl space-y-6">
          <div className="border border-pink-300 rounded-lg p-4 bg-white/60 shadow-sm">
            <h3 className="text-lg font-semibold text-pink-700 mb-3">
              Basic Information
            </h3>

            {/* First Name */}
            <fieldset className="mb-4">
              <legend className="text-sm text-pink-600 mb-1">
                First Name:
              </legend>
              <input
                value={firstName}
                type="text"
                className="input-style w-full"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </fieldset>

            {/* Last Name */}
            <fieldset className="mb-4">
              <legend className="text-sm text-pink-600 mb-1">Last Name:</legend>
              <input
                value={lastName}
                type="text"
                className="input-style w-full"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </fieldset>

            {/* Age, Gender, Height */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <fieldset>
                <legend className="text-sm text-pink-600 mb-1">Age:</legend>
                <input
                  value={age}
                  type="number"
                  className="input-style"
                  placeholder="Age"
                  onChange={(e) => setAge(e.target.value)}
                />
              </fieldset>
              <fieldset>
                <legend className="text-sm text-pink-600 mb-1">Gender:</legend>
                <select
                  className="input-style"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </fieldset>
              <fieldset>
                <legend className="text-sm text-pink-600 mb-1">
                  Height (cm):
                </legend>
                <input
                  value={height}
                  type="number"
                  className="input-style"
                  placeholder="Height"
                  onChange={(e) => setHeight(e.target.value)}
                />
              </fieldset>
            </div>

            {/* Location */}
            <fieldset className="mt-4">
              <legend className="text-sm text-pink-600 mb-1">Location:</legend>
              <input
                value={location}
                type="text"
                className="input-style w-full"
                placeholder="City, Country"
                onChange={(e) => setLocation(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="border border-pink-300 rounded-lg p-4 bg-white/60 shadow-sm">
            <h3 className="text-lg font-semibold text-pink-700 mb-3">
              Education & Work
            </h3>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                University:
              </legend>
              <input
                value={university}
                type="text"
                className="input-style w-full"
                placeholder="University Name"
                onChange={(e) => setUniversity(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">School:</legend>
              <input
                value={school}
                type="text"
                className="input-style w-full"
                placeholder="School Name"
                onChange={(e) => setSchool(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                Current Company:
              </legend>
              <input
                value={company}
                type="text"
                className="input-style w-full"
                placeholder="Company Name"
                onChange={(e) => setCompany(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="border border-pink-300 rounded-lg p-4 bg-white/60 shadow-sm">
            <h3 className="text-lg font-semibold text-pink-700 mb-3">
              Experience & Projects
            </h3>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                Internships:
              </legend>
              <input
                value={internships}
                type="text"
                className="input-style w-full"
                placeholder="Internship 1, Internship 2..."
                onChange={(e) => setInternships(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                Full-Time Jobs:
              </legend>
              <input
                value={fullTimeJobs}
                type="text"
                className="input-style w-full"
                placeholder="Job 1, Job 2..."
                onChange={(e) => setFullTimeJobs(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                Project Links:
              </legend>
              <input
                value={projects}
                type="text"
                className="input-style w-full"
                placeholder="https://link1, https://link2..."
                onChange={(e) => setProjects(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">GitHub:</legend>
              <input
                value={github}
                type="url"
                className="input-style w-full"
                placeholder="https://github.com/yourname"
                onChange={(e) => setGithub(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                Total Experience (years):
              </legend>
              <input
                value={experience}
                type="number"
                className="input-style"
                placeholder="Years"
                onChange={(e) => setExperience(e.target.value)}
              />
            </fieldset>
          </div>

          <div className="border border-pink-300 rounded-lg p-4 bg-white/60 shadow-sm">
            <h3 className="text-lg font-semibold text-pink-700 mb-3">
              Additional Info
            </h3>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">Skills:</legend>
              <input
                value={skills}
                type="text"
                className="input-style w-full"
                placeholder="JavaScript, React, ..."
                onChange={(e) => setSkills(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">Languages:</legend>
              <input
                value={languages}
                type="text"
                className="input-style w-full"
                placeholder="English, Hindi..."
                onChange={(e) => setLanguages(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">About You:</legend>
              <textarea
                value={about}
                rows={4}
                className="input-style w-full"
                placeholder="Tell us about yourself..."
                onChange={(e) => setAbout(e.target.value)}
              />
            </fieldset>

            <fieldset className="mb-3">
              <legend className="text-sm text-pink-600 mb-1">
                Profile Picture:
              </legend>

              {/* Manual URL Input */}
              <input
                value={photoUrl}
                type="url"
                className="input-style mb-2"
                placeholder="https://..."
                onChange={(e) => setPhotoUrl(e.target.value)}
              />

              {/* File Upload Input */}
              <input
                type="file"
                accept="image/*"
                onChange={async (e) => {
                  const file = e.target.files[0];
                  if (!file) return;

                  const formData = new FormData();
                  formData.append("photo", file);
                  formData.append("userId", user._id);

                  try {
                    const res = await axios.post(BASE_URL+
                      "/profile/edit/photo",
                      formData,
                      {
                        headers: { "Content-Type": "multipart/form-data" },
                      }
                    );
                    setPhotoUrl(res.data.user.profilePhoto);
                  } catch (err) {
                    console.error("Upload failed", err);
                    alert("Failed to upload image");
                  }
                }}
                className="text-sm text-gray-700"
              />

              {/* Preview Image */}
              {photoUrl && (
                <img
                  src={photoUrl}
                  alt="Preview"
                  className="mt-2 w-24 h-24 object-cover rounded-full border"
                />
              )}
            </fieldset>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <button
              className="bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded-lg transition"
              onClick={saveProfile}
            >
              Update Profile
            </button>

            <Link to={"/delete/profile"}>
              <button
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 
             hover:from-red-600 hover:to-pink-600 
             active:scale-95 transition-all duration-300 ease-in-out 
             text-white font-bold py-2 rounded-lg shadow-lg 
             tracking-wide ring-2 ring-transparent hover:ring-white"
              >
                Delete Profile
              </button>
            </Link>
          </div>

          {toast && (
            <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50">
              <div className="bg-green-600 text-white px-4 py-2 rounded shadow-lg animate-slide-in">
                Profile Updated Successfully.
              </div>
            </div>
          )}
        </div>
      </div>

      {/* My Card Section */}
      <div className="flex items-center justify-center w-full lg:w-2/5 p-6 sm:p-8 bg-gradient-to-br from-pink-100/40 to-blue-100/40">
        <MyCard
          user={{
            firstName,
            lastName,
            photoUrl,
            location,
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
