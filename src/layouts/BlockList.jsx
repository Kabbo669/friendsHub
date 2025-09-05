import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, remove, set } from 'firebase/database';

const BlockList = () => {
  const db = getDatabase();
  let [blockFriend, setBlockFriend] = useState([])
  
  let blockData = useSelector(state =>state.activeUser.value)
  // console.log(blockData);
 
  
  useEffect(()=>{
   const blockRef = ref(db, 'BlockList/');
   onValue(blockRef, (snapshot) => {
    let array = []
    snapshot.forEach(item=>{
      if(blockData.uid === item.val().blockById){
        array.push({
          id: item.key,
          block:item.val().block,
          blockId: item.val().blockId
        });
      }else if(blockData.uid === item.val().blockId){
        array.push({
          id: item.key,
          blockBy: item.val().blockBy,
          blockById: item.val().blockById
        })
      }
      
     })
     setBlockFriend(array)
    });
  },[])
  console.log(blockFriend);
  

   // This will unblock the blocked friend and make them friends as it was earlier
  let handleUnblock=(item)=>{
      set(push(ref(db, 'friends/')), {
        receiverId: item.blockId ,
        receiverName: item.block,
        senderId:blockData.uid ,
        senderName: blockData.displayName,
      }).then(()=>{
        remove(ref(db, 'BlockList/' + item.id))
      })
  }
 

  // let handleUnblock=(item)=>{
  //   remove(ref(db, "BlockList/" + item.id))
  // }
//  This logic will just unblock the user and will remove data from BlockList but not declare them friends and the button friends will not be shown on userlIst

  
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
            <h4 className="text-xl font-semibold font-poppins">Blocked Users</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className="h-[280px] overflow-auto">
           {
            blockFriend.map(item=>(
              <SingleUser extraLabel={item.blockBy && "Blocked By"} profileName={item.block}  blockedBy = {item.blockBy} 
              src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar2.webp?alt=media&token=e7ec9f91-5fc8-4d51-8833-ea662cecc94b"
              buttonOneText = {item.block && "Unblock"} buttonOneClick={()=>handleUnblock(item)}/>
            ))
           }
          </div>
        </div>
   </>
  )
}

export default BlockList