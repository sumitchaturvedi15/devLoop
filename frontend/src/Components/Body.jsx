import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { BASE_URL } from '../utils/constants'
import axios from 'axios'
import { addUser } from '../utils/userSlice'
import { useEffect } from 'react'

const Body = () => {
  const userData= useSelector((store)=>store.user);
  const navigate= useNavigate();
  const dispatch= useDispatch();

  const fetchUser = async()=>{
    if(userData) return;
    try{
      const res=await axios.get(BASE_URL+"/profile",{
        withCredentials:true,
      });
      dispatch(addUser(res.data));
    }
    catch(err){
      if(err.status===401){
        navigate("/login")
      }
      console.error(err);
    }
  }

  useEffect(()=>{
    fetchUser();
  },[])
  return (
    <div>
        <Navbar/>
        <Outlet/>
        <Footer/>
    </div>
  )
}

export default Body