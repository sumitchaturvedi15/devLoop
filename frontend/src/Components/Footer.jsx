import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-indigo-950 via-purple-900 to-black text-gray-300 px-6 py-10 mt-auto w-full">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base">
          <a className="link link-hover hover:text-white transition">About Us</a>
          <a className="link link-hover hover:text-white transition">Contact</a>
          <a className="link link-hover hover:text-white transition">Jobs</a>
          <a className="link link-hover hover:text-white transition">Press Kit</a>
        </nav>

        {/* Social Icons */}
        <div className="flex gap-5 justify-center">
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current hover:text-white text-blue-400"
            >
              <path d="M24 4.557c...z" />
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current hover:text-white text-red-500"
            >
              <path d="M19.615 3.184c...z" />
            </svg>
          </a>
          <a href="#">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              className="fill-current hover:text-white text-blue-600"
            >
          </svg>
          </a>
        </div>

        {/* Footer Note */}
        <div className="w-full text-sm text-gray-400">
          © {new Date().getFullYear()} All rights reserved —{" "}
          <span className="text-indigo-400 font-medium">Sumit Chaturvedi</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
