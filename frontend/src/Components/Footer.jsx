import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-t from-gray-900 via-indigo-950 to-black text-gray-300 w-full px-4 sm:px-6 py-8">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center gap-6 text-center">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-4 sm:gap-6 text-sm sm:text-base font-medium">
          {["About Us", "Contact", "Jobs", "Press Kit"].map((item, idx) => (
            <a
              key={idx}
              href="#"
              className="text-gray-400 hover:text-white transition-colors duration-200"
            >
              {item}
            </a>
          ))}
        </nav>

        {/* Social Icons */}
        <div className="flex gap-6 justify-center">
          {/* Twitter */}
          <a href="#" aria-label="Twitter">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current text-blue-400 hover:text-white transition-colors duration-200"
              viewBox="0 0 24 24"
            >
              <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.11 0c-2.5 0-4.5 2.28-4.5 5.09 0 .4.04.79.13 1.17A12.94 12.94 0 013 1.67a5.06 5.06 0 00-.61 2.56c0 1.77.87 3.34 2.2 4.25a4.5 4.5 0 01-2.05-.57v.06c0 2.48 1.64 4.56 3.82 5.03a4.56 4.56 0 01-2.04.08c.58 1.92 2.26 3.32 4.25 3.36A9.05 9.05 0 012 19.54 12.77 12.77 0 008.29 21c7.55 0 11.68-6.29 11.68-11.75 0-.18-.01-.35-.02-.53A8.36 8.36 0 0023 3z" />
            </svg>
          </a>

          {/* YouTube */}
          <a href="#" aria-label="YouTube">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current text-red-500 hover:text-white transition-colors duration-200"
              viewBox="0 0 24 24"
            >
              <path d="M19.6 3.2c-1.7-.1-5.7-.2-7.6-.2s-5.9.1-7.6.2c-1.9.1-3.2 1.6-3.2 3.2v11.2c0 1.6 1.3 3.1 3.2 3.2 1.7.1 5.7.2 7.6.2s5.9-.1 7.6-.2c1.9-.1 3.2-1.6 3.2-3.2V6.4c0-1.6-1.3-3.1-3.2-3.2zM10 15.5v-7l6 3.5-6 3.5z" />
            </svg>
          </a>

          {/* Facebook */}
          <a href="#" aria-label="Facebook">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6 fill-current text-blue-600 hover:text-white transition-colors duration-200"
              viewBox="0 0 24 24"
            > 
            <path d="M22.675 0h-21.35C.595 0 0 .6 0 1.333v21.333C0 23.4.595 24 1.325 24H12.82v-9.294H9.692V11.29h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.462.098 2.794.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.31h3.587l-.467 3.416h-3.12V24h6.116c.73 0 1.324-.6 1.324-1.334V1.333C24 .6 23.405 0 22.675 0z" />
            </svg>
          </a>
        </div>

        {/* Footer Note */}
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} All rights reserved —{" "}
          <span className="text-indigo-400 font-semibold">Sumit Chaturvedi</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
