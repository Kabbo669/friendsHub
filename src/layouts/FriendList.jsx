import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue} from "firebase/database";
import { useSelector } from 'react-redux';


const FriendList = () => {
   const db = getDatabase();
   let [friendsList, setFriendsList] = useState([])
   
   let friends = useSelector((state)=>console.log(state.activeUser.value))

 useEffect(()=>{
 const friendsRef = ref(db, 'friends/');
 onValue(friendsRef, (snapshot) => {
  // console.log(snapshot.val());
  let array = []
  snapshot.forEach(item=>{
   array.push(item.val());
  })
 setFriendsList(array)
});
  },[])

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
  
           {
            friendsList.map(item=>(
              <SingleUser profileName= {item.senderName} profileText= {item.senderEmail} buttonOneText="Block"/>
            ))
           }
    
          </div>
        </div>
      </>
  )
}

export default FriendList