import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-t from-[#0b0f1a] via-[#0e1422] to-[#0b0f1a] text-white px-4 sm:px-6 py-8 border-t border-gray-800 shadow-inner">
      <div className="max-w-screen-xl mx-auto text-center flex flex-col items-center gap-6">
        {/* Social Media Icons */}
        <fieldset className="flex gap-6 justify-center">
          <legend className="sr-only">Social Media Links</legend>

          {/* GitHub */}
          <a
            href="https://github.com/sumitchaturvedi15"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <svg
              className="w-6 h-6 fill-current text-pink-400 hover:text-pink-300 transition-colors duration-200"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.37 0 0 5.4 0 12.08c0 5.34 3.44 9.86 8.21 11.46.6.12.82-.26.82-.58 0-.29-.01-1.05-.02-2.06-3.34.74-4.04-1.62-4.04-1.62-.55-1.42-1.35-1.8-1.35-1.8-1.1-.77.08-.76.08-.76 1.22.09 1.87 1.27 1.87 1.27 1.08 1.87 2.83 1.33 3.52 1.02.11-.8.42-1.33.76-1.63-2.67-.3-5.48-1.36-5.48-6.04 0-1.34.47-2.44 1.24-3.3-.13-.3-.54-1.51.12-3.14 0 0 1-.33 3.3 1.26a11.3 11.3 0 0 1 3.01-.41c1.02 0 2.05.14 3.01.41 2.3-1.6 3.3-1.26 3.3-1.26.66 1.63.25 2.84.12 3.14.77.86 1.24 1.96 1.24 3.3 0 4.69-2.82 5.74-5.51 6.03.43.37.82 1.1.82 2.22 0 1.6-.02 2.88-.02 3.27 0 .32.22.7.83.58A12.08 12.08 0 0 0 24 12.08C24 5.4 18.63 0 12 0z" />
            </svg>
          </a>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sumitchaturvedi15/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <svg
              className="w-6 h-6 fill-current text-pink-400 hover:text-pink-300 transition-colors duration-200"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M20.447 20.452H17.21v-5.569c0-1.328-.026-3.037-1.849-3.037-1.851 0-2.134 1.445-2.134 2.94v5.666H9.01V9h3.1v1.561h.044c.431-.816 1.485-1.676 3.056-1.676 3.27 0 3.872 2.153 3.872 4.951v6.616zM5.337 7.433a1.8 1.8 0 1 1 0-3.599 1.8 1.8 0 0 1 0 3.6zm1.62 13.02H3.716V9h3.241v11.453zM22.225 0H1.771C.792 0 0 .774 0 1.728v20.543C0 23.226.792 24 1.771 24h20.451C23.2 24 24 23.226 24 22.271V1.728C24 .774 23.2 0 22.225 0z" />
            </svg>
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/sumitchaturvedii15"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
          >
            <svg
              className="w-6 h-6 fill-current text-pink-400 hover:text-pink-300 transition-colors duration-200"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M7.75 2A5.76 5.76 0 002 7.75v8.5A5.76 5.76 0 007.75 22h8.5A5.76 5.76 0 0022 16.25v-8.5A5.76 5.76 0 0016.25 2h-8.5zM12 7.1a4.9 4.9 0 110 9.8 4.9 4.9 0 010-9.8zm0 1.8a3.1 3.1 0 100 6.2 3.1 3.1 0 000-6.2zM17.5 6a1.1 1.1 0 110 2.2 1.1 1.1 0 010-2.2zM20.2 7.75v8.5a3.95 3.95 0 01-3.95 3.95h-8.5A3.95 3.95 0 014.8 16.25v-8.5A3.95 3.95 0 017.75 3.8h8.5a3.95 3.95 0 013.95 3.95z" />
            </svg>
          </a>
        </fieldset>

        {/* Footer Text */}
        <fieldset>
          <legend className="sr-only">Copyright</legend>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} All rights reserved —{" "}
            <span className="text-white font-semibold">
              Sumit Chaturvedi
            </span>
          </p>
        </fieldset>
      </div>
    </footer>
  );
};

export default Footer;
