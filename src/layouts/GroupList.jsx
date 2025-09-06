import React, { useEffect, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import SingleUser from "./SingleUser";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';
import Search from '../components/Search';

const GroupList = ({headerText = "Group List", className }) => {
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
       <Search isActive={true}/>
  
        <div className= "mt-7 border border-t-0 rounded-lg shadow-lg h-[332px]">
          <div className="flex items-center justify-between  px-[25px] py-3">
            <h4 className="text-xl font-semibold font-poppins">{headerText}</h4>
            <BsThreeDotsVertical className="text-[#5F35F5]" />
          </div>
  
          <div className= {`overflow-auto h-[272px] ${className}`}>
  
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