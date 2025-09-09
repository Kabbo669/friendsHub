import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue, push, set, remove} from "firebase/database";
import { useSelector } from 'react-redux';
import Search from '../components/Search';


const FriendList = ({showSearch = true, className, buttonOneText, onChatClick}) => {
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
        {
         showSearch && <Search isActive={true}/>
        }
  
        <div className="mt-7 border border-t-0 rounded-lg shadow-lg h-[332px]">
          <div className="flex items-center justify-between  px-[25px] py-3">
            <h4 className="text-xl font-semibold font-poppins">Friends</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className= {`overflow-auto h-[262px] ${className}`}>
  
           {
            friendsList.map(item=>{
            const friendId = friends.uid === item.receiverId ?item.senderId : item.receiverId
            const friendName = friends.uid === item.receiverId ? item.senderName : item.receiverName


             return <SingleUser profileName= {friends.uid === item.receiverId ? item.senderName: item.receiverName} profileText= {item.senderEmail}
              src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar2.webp?alt=media&token=e7ec9f91-5fc8-4d51-8833-ea662cecc94b" 
              buttonOneText={buttonOneText || "Block"} buttonOneClick={()=>{
                if(onChatClick){
                  onChatClick({id: friendId, name: friendName})
                }else{
                  handleBlock(item)
                }
              }
            }
            />
           })
           }
    
          </div>
        </div>
      </>
  )
}

export default FriendList