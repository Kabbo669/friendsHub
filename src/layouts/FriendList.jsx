import React from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";


const FriendList = () => {
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
  
        <div className="mt-7 border border-t-0 rounded-lg shadow-lg h-[332px]">
          <div className="flex items-center justify-between  px-[25px] py-3">
            <h4 className="text-xl font-semibold font-poppins">Friends</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className="h-[280px] overflow-auto">
  
           <SingleUser profileName= "Friends Reunion" profileText= "Hi Guys, Wassup!" buttonText="Join"/>
           <SingleUser profileName= "Friends Forever" profileText="Good to see you" buttonText="Join"/>
           <SingleUser profileName="Crazy Cousins" profileText="What plans today?" buttonText="Join" />
           <SingleUser profileName= "Friends Reunion" profileText= "Hi Guys, Wassup!" buttonText="Join"/>
           <SingleUser profileName= "Friends Forever" profileText="Good to see you" buttonText="Join"/>
           <SingleUser profileName="Crazy Cousins" profileText="What plans today?" buttonText="Join" isLast={true}/>
    
          </div>
        </div>
      </>
  )
}

export default FriendList