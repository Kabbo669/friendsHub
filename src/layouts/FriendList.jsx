import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue, push, set, remove} from "firebase/database";
import { useSelector } from 'react-redux';


const FriendList = () => {
   const db = getDatabase();
   let [friendsList, setFriendsList] = useState([])
   
   let friends = useSelector((state)=>state.activeUser.value)
   console.log(friends);
   

 useEffect(()=>{
 const friendsRef = ref(db, 'friends/');
 onValue(friendsRef, (snapshot) => {
  // console.log(snapshot.val());
  let array = []
  snapshot.forEach(item=>{
    // console.log(item.val());
    if(friends.uid === item.val().senderId || friends.uid === item.val().receiverId){
    array.push({...item.val(), id:item.key})
    }
  })
 setFriendsList(array)
});
  },[])

  let handleBlock=(item)=>{
    
     if(friends.uid === item.senderId){
     set(push(ref(db, 'BlockList/')), { 
     block:item.receiverName,
     blockId:item.receiverId,
     blockBy: item.senderName,
     blockById:item.senderId,
    }).then(()=>{
      remove(ref(db, 'friends/' + item.id))
    })
     }else{
    set(push(ref(db, 'BlockList/')), { 
     block:item.senderName,
     blockId:item.senderId,
     blockBy: item.receiverName,
     blockById:item.receiverId,
    }).then(()=>{
      remove(ref(db, 'friends/' + item.id))
    })
    }
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
            <h4 className="text-xl font-semibold font-poppins">Friends</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className="h-[280px] overflow-auto">
  
           {
            friendsList.map(item=>(
              <SingleUser profileName= {friends.uid === item.receiverId ? item.senderName: item.receiverName} profileText= {item.senderEmail}
              src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar2.webp?alt=media&token=e7ec9f91-5fc8-4d51-8833-ea662cecc94b" 
              buttonOneText="Block" buttonOneClick={()=>handleBlock(item)}/>
            ))
           }
    
          </div>
        </div>
      </>
  )
}

export default FriendList