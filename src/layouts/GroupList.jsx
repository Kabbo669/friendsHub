import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import { CgKey } from 'react-icons/cg';

const GroupList = () => {
  const db = getDatabase();

  let [groupList, setGroupList] = useState([])


  let groupData = useSelector((state)=>state.activeUser.value)
  console.log(groupData);

  useEffect(()=>{
  const starCountRef = ref(db, 'MyGroups/');
  onValue(starCountRef, (snapshot) => {
    let array = []
  // console.log(snapshot.val());
  snapshot.forEach(item=>{
   if(item.val().adminId !== groupData.uid){
    array.push({...item.val(), id: item.key})
   }
   
  })
  setGroupList(array)
  });
},[])
  console.log(groupList);

  
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
            <h4 className="text-xl font-semibold font-poppins">Groups List</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className="h-[280px] overflow-auto">
  
           {
            groupList.map(item=>(
            <SingleUser profileName={item.groupName} profileText={item.groupTag} src= "https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar2.webp?alt=media&token=e7ec9f91-5fc8-4d51-8833-ea662cecc94b"
            buttonOneText= "Join Request"/>
            ))
           }
          
    
          </div>
        </div>
  </>
  )
}

export default GroupList