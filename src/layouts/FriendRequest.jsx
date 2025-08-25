import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';

const FriendRequest = () => {
  const db = getDatabase();

  let requestData = useSelector((state)=>state.activeUser.value)
  console.log(requestData.uid);

  let [friendRequestData, setFriendRequestData] = useState([])


  useEffect(()=>{
  const friendRequestRef = ref(db, 'friendRequest/');
  onValue(friendRequestRef, (snapshot) => {
    let array = []
  //  console.log(snapshot.val());

   snapshot.forEach(item=>{
    if(item.val().receiverId === requestData.uid){
     array.push({...item.val()});
    }
   
   })
   setFriendRequestData(array) 
  });
 },[])
console.log(friendRequestData);

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
            <h4 className="text-xl font-semibold font-poppins">Friend Request</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className="h-[280px] overflow-auto">
  
           {
            friendRequestData.map(item=>(
              <SingleUser profileName= {item.senderName} profileText={item.senderEmail} buttonText="Accept"/>
            ))
           }
           
    
          </div>
        </div>
   </>
  )
}

export default FriendRequest