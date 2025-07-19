import { useDispatch, useSelector } from "react-redux";
import devLoopLogo from "../Images/devLoop.png";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-gradient-to-r from-pink-100 via-pink-200 to-white text-gray-800 px-4 py-3 shadow-md border-b border-rose-300 z-50">
      <div className="flex-1">
        <Link to="/feed" className="flex items-center gap-2">
          <img src={devLoopLogo} alt="devLoop logo" className="h-8 w-auto" />
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          <span className="hidden sm:block text-sm font-medium opacity-80">
            Welcome, {user.firstName}
          </span>

          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-rose-400 ring-offset-2 ring-offset-pink-100 hover:ring-offset-0 transition-all duration-200"
            >
              <div className="w-10 rounded-full overflow-hidden">
                <img
                  alt="User Avatar"
                  src={user.photoUrl}
                  className="object-cover w-full h-full"
                />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow-lg bg-white/90 backdrop-blur-md border border-rose-200 rounded-box w-52"
            >
              {[
                { to: "/feed", label: "Home", icon: "M3 12l9-9 9 9M4 10v10a1 1 0 001 1h5m4 0h5a1 1 0 001-1V10" },
                { to: "/chat", label: "Chat", icon: "M5.121 17.804A6.978 6.978 0 0112 15c2.042 0 3.88.857 5.121 2.222M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { to: "/profile", label: "Profile", icon: "M5.121 17.804A6.978 6.978 0 0112 15c2.042 0 3.88.857 5.121 2.222M15 11a3 3 0 11-6 0 3 3 0 016 0z" },
                { to: "/connections", label: "Connections", icon: "M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m13-7a4 4 0 11-8 0 4 4 0 018 0zM7 7a4 4 0 100 8 4 4 0 000-8z" },
                { to: "/requests", label: "Requests", icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-9 13h.01" },
              ].map(({ to, label, icon }) => (
                <li key={label}>
                  <Link
                    to={to}
                    className="flex items-center gap-2 hover:bg-rose-100 text-rose-700 rounded-md transition duration-200"
                    onClick={() => document.activeElement?.blur()}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-rose-400"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d={icon}
                      />
                    </svg>
                    {label}
                  </Link>
                </li>
              ))}

              <li>
                <a
                  onClick={() => {
                    document.activeElement?.blur();
                    handleLogout();
                  }}
                  className="flex items-center gap-2 hover:bg-rose-200 text-rose-600 rounded-md transition duration-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 text-rose-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1m0-10V5"
                    />
                  </svg>
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
