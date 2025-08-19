import React, { useEffect, useState } from "react";
import Image from "./Image";
import Profile from '../assets/nishat2.jpg'
import { IoHomeOutline, IoSettingsOutline } from "react-icons/io5";
import { LuLogOut, LuMessageCircleMore } from "react-icons/lu";
import { RiNotification3Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { userInfo } from "../slices/userInfoSlice";

const Sidebar = () => {
  const auth = getAuth();
  let [activeValue, setActiveValue] = useState("")

  let dispatch = useDispatch()
  let userData = useSelector(state=>state.activeUser.value)
  console.log(userData);
  let navigate = useNavigate()
  let location = useLocation()
 


  let handleLogout=()=>{
   signOut(auth).then(() => {
   toast.success("Sign Out successfull", {
    className:
     "bg-blue-500 text-xl text-white rounded-lg font-bold font-nunito",
      progressClassName: "bg-white"})
      dispatch(userInfo(null))
      localStorage.removeItem("userInfo")
      navigate('/login')
  }).catch((error) => {
    console.log(error);
  
  }); 
}

 useEffect(()=>{
  setActiveValue(location.pathname.replace("/pages/", ""))
 },[location.pathname])
 console.log(activeValue);


  return (
    <div className="w-full h-screen flex items-center">
      <div className="bg-[#5F35F5] h-[95%] rounded-2xl w-[80%] mx-auto flex flex-col items-center justify-between py-10 box-border">

        <div className="w-[120px] h-[120px] flex-shrink-0 rounded-full overflow-hidden">
          {/* here flex-shrink keep image in the box and without flex-shrink-0 the image will be disappeared while zooming in */}
         <Image src={Profile} alt="Profile Image" className= "w-full h-full object-cover"/>
        </div>

        <div className="flex flex-col items-center justify-between text-white text-[50px] gap-y-[60px]">
         <SidebarLink name="home" icon={IoHomeOutline} activeValue={activeValue} />
         <SidebarLink name= "message" icon={LuMessageCircleMore} activeValue={activeValue}/>
         <SidebarLink name = "notification" icon={RiNotification3Line } activeValue={activeValue}/>
         <SidebarLink name = "setting" icon={IoSettingsOutline} activeValue={activeValue}/>
        </div>

        <div className="text-white flex items-center text-[70px]">
          <LuLogOut onClick={handleLogout}/>
        </div>

      </div>
       <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
    </div>
  );
};

export default Sidebar;
