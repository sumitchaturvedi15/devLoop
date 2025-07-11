import { useDispatch, useSelector } from 'react-redux';
import devLoopLogo from '../Images/devLoop.png';
import { Link, useNavigate } from 'react-router-dom';
import { BASE_URL } from '../utils/constants';
import axios from 'axios';
import { removeUser } from '../utils/userSlice';

const Navbar = () => {
  const user= useSelector((store)=>store.user);
  const dispatch= useDispatch();
  const navigate= useNavigate();
  const handleLogout= async()=>{
    try{
      await axios.post(BASE_URL+"/logout",{},{
        withCredentials:true
      });
      dispatch(removeUser());
      return navigate("/login");
    }
    catch(err){
      console.log(err);
    }
  }
  return (
    <div className="navbar bg-base-200 shadow-sm">
      <div className="flex-1">
        <img src={devLoopLogo} alt="devLoop logo" className="h-8 w-auto ml-2"/>
        {/* <a className="btn btn-ghost text-xl">devLoop</a> */}
      </div>
      {user && (<div className="flex gap-2">
        <div className='form-control my-2'>Welcome, {user.firstName}</div>
        <div className="dropdown dropdown-end mx-5">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src={user.photoUrl}
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <Link to={"/profile"} className="justify-between">
                Profile
                <span className="badge">New</span>
              </Link>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a onClick={handleLogout}>Logout</a>
            </li>
          </ul>
        </div>
      </div>)}
    </div>
  );
};

export default Navbar;
