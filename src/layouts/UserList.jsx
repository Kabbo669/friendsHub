import React, { useEffect, useState } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue, set, push } from "firebase/database";
import { useSelector } from "react-redux";
import FriendRequest from "./FriendRequest";


const UserList = () => {
  const db = getDatabase();
  let [userInfo, setUserInfo] = useState([])
  let [concatFriendRequest, setConcatFriendRequest] = useState([])
  let [concatFriends, setConcatFriends] = useState([])

  let commonData = useSelector((state)=>state.activeUser.value)
  
    // console.log(requestData.uid);
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


  useEffect(()=>{
    const friendRequestRef = ref(db, 'friendRequest/');
    onValue(friendRequestRef, (snapshot) => {
      
      let array = []
      snapshot.forEach(item=>{
        array.push(item.val().receiverId + item.val().senderId);

      // console.log(item.val().receiverId);
      // console.log(item.val().senderId);
     })
     setConcatFriendRequest(array) 
    });
   },[])
  //  console.log(concatFriendRequest)
   

  useEffect(()=>{
     const friendsRef = ref(db, 'friends/');
     onValue(friendsRef, (snapshot) => {
      let array2 =[]
      // console.log(snapshot.val());
      snapshot.forEach(item=>{
       array2.push(item.val().receiverId + item.val().senderId);
      })
      setConcatFriends(array2)
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
          <h4 className="text-xl font-semibold font-poppins">User List</h4>
          <BsThreeDotsVertical className="text-[#5F35F5]" />
        </div>

        <div className="h-[280px] overflow-auto">

        {
          userInfo.map(item=>{
            let status = "add"
            const concat1 = item.id + commonData.uid;
            const concat2 = commonData.uid + item.id

            if(concatFriends.includes(concat1) || concatFriends.includes(concat2)){
              status = "friends"
            }else if( concatFriendRequest.includes(concat1)|| concatFriendRequest.includes(concat2)){
              status = concatFriendRequest.includes(concat2) ? "pending": "cancel"
            }

            return(
              <SingleUser key={item.id} profileName={item.username} profileText={item.email} buttonOneText={
                status === "friends"
                ? "Friends"
                : status === "pending"
                ? "Pending"
                : status === "cancel"
                ? "Cancel"
                : "Add"
              } buttonOneClick= {status === "add" ? ()=>handleFriendRequest(item): undefined}
              />
            )


          })
          

          
        }
        </div>
      </div>
    </>
  );
};

export default UserList;

//  if needs to use onClick on component either have to use onClick={onClick} or have to pass {...props} on the component
