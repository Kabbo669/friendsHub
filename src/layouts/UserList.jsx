import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";


const UserList = () => {
  const db = getDatabase();
  let [userInfo, setUserInfo] = useState([])

  let commonData = useSelector((state)=>state.activeUser.value)
  // console.log(commonData.uid);
  // console.log(commonData.photoURL);

  useEffect(()=>{
  const userInfoRef = ref(db, 'userInfo/');
  onValue(userInfoRef, (snapshot) => {
    let array = []
  // console.log(snapshot.val());
  snapshot.forEach(item=>{
    if(commonData.uid !== item.key){
     // console.log(item.val());
    // console.log(item.key)
    array.push({...item.val(),id:item.key})
    }
    
  })
  setUserInfo(array)
  
 });
  },[])
  // console.log(userInfo);

 let handleFriendRequest=(item)=>{
  console.log(item);
   set(push(ref(db, 'friendRequest/')), {
    // user.user.uid is only used in registration or login page
    receiverId:item.id ,
    receiverName: item.username,
    receiverEmail: item.email,
    senderId:commonData.uid ,
    senderName: commonData.displayName,
    senderEmail: commonData.email,
    // Sender data always collect from redux  and receiver data from databse using item
  });
  }



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
         <SingleUser profileName= {item.username} profileText={item.email} buttonText="Add"
         onClick={()=>handleFriendRequest(item)}/>

         //  if needs to use onClick on component either have to use onClick={onClick} or have to pass {...props} on the component
          ))
         }
   
        </div>
      </div>
    </>
  );
};

export default UserList;
