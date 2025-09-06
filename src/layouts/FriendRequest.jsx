import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue, push ,set, remove } from "firebase/database";
import { useSelector } from 'react-redux';
import Search from '../components/Search';

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
     array.push({...item.val(),id:item.key});
    }
   })
   setFriendRequestData(array) 
  });
 },[])
console.log(friendRequestData);


 let handleAccept=(item)=>{
  console.log(item);
  set(push(ref(db, 'friends/')), { 
     ...item
    }).then(()=>{
      remove(ref(db, 'friendRequest/' + item.id))
    })
 }

 let handleDelete=(item)=>{
  remove(ref(db, 'friendRequest/' + item.id))
 }

  return (
  <>
       <Search isActive={true}/>
  
        <div className="mt-7 border border-t-0 rounded-lg shadow-lg h-[332px]">
          <div className="flex items-center justify-between  px-[25px] py-3">
            <h4 className="text-xl font-semibold font-poppins">Friend Request</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className="h-[272px] overflow-auto">
  
           {
            friendRequestData.map(item=>(
            
                <SingleUser profileName= {item.senderName} profileText={item.senderEmail} buttonOneText="Accept" buttonTwoText= "delete" className= "text-[12px] px-[8px] py-[4px]" buttonOneClick={()=>handleAccept(item)} buttonTwoClick={()=>handleDelete(item)}
                src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar2.webp?alt=media&token=e7ec9f91-5fc8-4d51-8833-ea662cecc94b"/>
            ))
           } 
    
          </div>
        </div>
   </>
  )
}

export default FriendRequest