import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
  const db = getDatabase();
  let [userInfo, setUserInfo] = useState([])

  useEffect(()=>{
  const userInfoRef = ref(db, 'userInfo/');
  onValue(userInfoRef, (snapshot) => {
    let array = []
  // console.log(snapshot.val());
  snapshot.forEach(item=>{
    // console.log(item.val());
    array.push({...item.val()})
  })
  setUserInfo(array)
  
 });
  },[])
  // console.log(userInfo);


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
          <h4 className="text-xl font-semibold font-poppins">User List</h4>
          <BsThreeDotsVertical className="text-[#5F35F5]" />
        </div>

        <div className="h-[280px] overflow-auto">
         
         {
          userInfo.map(item=>(
         <SingleUser profileName= {item.username} profileText={item.email} buttonText="Join"/>
          ))
         }
   
        </div>
      </div>
    </>
  );
};

export default UserList;
