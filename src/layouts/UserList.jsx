import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import UserImage from "../assets/nishat2.jpg";

const UserList = () => {
  return (
    <>
      <div className="box-border relative">
        <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[25px] text-[#5F35F5]" />
        <input
          type="text"
          className="w-full bg-white border-t-0  rounded-full shadow-xl py-4 px-[60px]"
          placeholder="Search"
        />
        <BsThreeDotsVertical className="absolute top-1/2 -translate-y-1/2 right-[25px] text-[#5F35F5]" />
      </div>

      <div className="mt-7 border border-t-0 rounded-lg shadow-lg">
        <div className="flex items-center justify-between  px-[25px] py-3">
          <h4 className="text-xl font-semibold font-poppins">User List</h4>
          <BsThreeDotsVertical className="text-[#5F35F5]" />
        </div>

        <div className="">
          <div className="relative flex items-center mb-[14px] pt-[17px]">
          <div className="h-[70px] w-[70px] ml-[20px]">
            <img src={UserImage} alt="" className="w-full h-full rounded-full"/>
          </div>
          <div className="pl-[14px]">
            <h4 className="text-[18px] font-poppins font-semibold">Freinds Reuinon</h4>
            <p className="text-[14px] font-poppins font-normal text-[#4D4D4D]">Hi guys, Wassup!</p>
            
          </div>
           <div className="ml-[130px]">
            <button className="bg-[#5F35F5] text-[#FFFFFF] px-[23px] rounded text-[20px] font-semibold font-poppins">Join</button>
          </div>
          <span className="absolute w-[455px] bg-[#000000] top-[95px] left-[20px] border-b"></span>
        </div>

        <div className="relative flex items-center mb-[14px] pt-[14px] ">
          <div className="h-[70px] w-[70px] ml-[20px]">
            <img src={UserImage} alt="" className="w-full h-full rounded-full"/>
          </div>
          <div className="pl-[14px]">
            <h4 className="text-[18px] font-poppins font-semibold">Freinds Reuinon</h4>
            <p className="text-[14px] font-poppins font-normal text-[#4D4D4D]">Hi guys, Wassup!</p>
            
          </div>
           <div className="ml-[130px]">
            <button className="bg-[#5F35F5] text-[#FFFFFF] px-[23px] rounded text-[20px] font-semibold font-poppins">Join</button>
          </div>
          <span className="absolute w-[455px] bg-[#000000] top-[95px] left-[20px] border-b"></span>
        </div>

        <div className="flex items-center mb-[14px] pt-[14px] ">
          <div className="h-[70px] w-[70px] ml-[20px]">
            <img src={UserImage} alt="" className="w-full h-full rounded-full"/>
          </div>
          <div className="pl-[14px]">
            <h4 className="text-[18px] font-poppins font-semibold">Freinds Reuinon</h4>
            <p className="text-[14px] font-poppins font-normal text-[#4D4D4D]">Hi guys, Wassup!</p>
            
          </div>
           <div className="ml-[130px]">
            <button className="bg-[#5F35F5] text-[#FFFFFF] px-[23px] rounded text-[20px] font-semibold font-poppins">Join</button>
          </div>
         </div>
        </div>

      </div>
    </>
  );
};

export default UserList;
