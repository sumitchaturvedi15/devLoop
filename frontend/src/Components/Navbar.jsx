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
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="navbar bg-black/80 text-white backdrop-blur-md shadow-lg border-b border-indigo-900 z-50">
      <div className="flex-1">
        <Link to="/feed">
          <img
            src={devLoopLogo}
            alt="devLoop logo"
            className="h-8 w-auto ml-2"
          />
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-3">
          <span className="text-sm opacity-80">Welcome, {user.firstName}</span>
          <div className="dropdown dropdown-end mr-4">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full ring ring-indigo-600 ring-offset-2 ring-offset-black">
                <img alt="User Avatar" src={user.photoUrl} />
              </div>
            </div>

            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content backdrop-blur-md bg-black/70 text-white rounded-box z-10 mt-3 w-52 p-2 shadow-lg border border-gray-700"
            >
              <li>
                <Link
                  to="/feed"
                  className="hover:bg-white/10 transition duration-200 rounded-md"
                  onClick={() => document.activeElement?.blur()}
                >
                  🏠 Home
                </Link>
              </li>
              <li>
                <Link
                  to="/profile"
                  className="hover:bg-white/10 transition duration-200 rounded-md"
                  onClick={() => document.activeElement?.blur()}
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/connections"
                  className="hover:bg-white/10 transition duration-200 rounded-md"
                  onClick={() => document.activeElement?.blur()}
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to="/requests"
                  className="hover:bg-white/10 transition duration-200 rounded-md"
                  onClick={() => document.activeElement?.blur()}
                >
                  Requests
                </Link>
              </li>
              <li>
                <a
                  onClick={() => {
                    document.activeElement?.blur();
                    handleLogout();
                  }}
                  className="hover:bg-white/10 transition duration-200 rounded-md"
                >
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
