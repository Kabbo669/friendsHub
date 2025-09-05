import React, { useEffect, useRef, useState } from 'react'
import { BsThreeDotsVertical } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import SingleUser from "./SingleUser";
import Button from '../components/Button';
import { TextField } from '@mui/material';
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const MyGroups = () => {
  const db = getDatabase();

  let [groupPopUp, setGroupPopUp] = useState(false)
  let [myGroupName, setMyGroupName] = useState("")
  let [myGroupTag, setMyGroupTag] = useState("")
  let [groupList, setGroupList] = useState([])
  let [addMemberPopUp, setAddMemberPopUp] = useState(false)
  let [userInfo, setUserInfo] = useState([])
  let [memberDetails, setMemberDetails] = useState([])
  let [adminDetails, setAdminDetails] = useState()
  let [groupSearchStore, setGroupSearchStore] = useState([])
  let [groupSearchInput, setGroupSearchInput] = useState("")


  let Data = useSelector((state)=>state.activeUser.value)
  // console.log(Data);

  let groupRef = useRef(null)
  let memberRef = useRef(null)

  let handleGroupSearch=(event)=>{
    setGroupSearchInput(event.target.value);

    let searchData = groupList.filter(item=>item.groupName.toLowerCase().includes(event.target.value.toLowerCase()))

    setGroupSearchStore(searchData);
  }

  let handleCreateGroup=()=>{
  setGroupPopUp(true)
  }

  let handelCreateGroupUi=(e)=>{
    if(!groupRef.current.contains(e.target)){
      setGroupPopUp(false)
    }
  }
  

  let handleCreate =()=>{
    set(push(ref(db, 'MyGroups/')), {
    groupName : myGroupName,
    groupTag : myGroupTag,
    admin: Data.displayName,
    adminId: Data.uid
  }).then=()=>{
    setGroupPopUp(false)
    setMyGroupName("")
    setMyGroupTag("")
   }
  }

  useEffect(()=>{
  const MyGroupsRef = ref(db, 'MyGroups/');
  onValue(MyGroupsRef, (snapshot) => {
    let array = []
    snapshot.forEach(item=>{
      if(item.val().adminId === Data.uid){
     array.push({...item.val()})
      }
    })
    setGroupList(array)
  });
  console.log(groupList);
 },[])

 let handleGroupAddMember=(item)=>{
  setAddMemberPopUp(true)
  setAdminDetails(item)
 }

  useEffect(()=>{
   const userInfoRef = ref(db, 'userInfo/');
    onValue(userInfoRef, (snapshot) => {
     let array = []
     snapshot.forEach(item=>{
      // console.log(item.val());
     if(Data.uid !== item.key){
     array.push({...item.val(),id:item.key})
     }
   })
   setUserInfo(array)
  });
   },[])

 let handleAddMemberUi=(e)=>{
  if(!memberRef.current.contains(e.target)){
    setAddMemberPopUp(false)
  }
 }

 let handleAddMember=(item)=>{
  let array = [...memberDetails]
  array.push({
    allMemberDetails : item
  })
  setMemberDetails(array)
 }
//  console.log(memberDetails);


 let handleAdd=()=>{
  // console.log(memberDetails);
  // console.log(adminDetails);
   set(push(ref(db, 'addMemberList/')), {
    admin :adminDetails.admin,
    adminId:adminDetails.adminId,
    groupName: adminDetails.groupName,
    allMember: memberDetails
  }).then(()=>{
    setAddMemberPopUp(false)
  })
 }

  return (
   <>
        <div className="box-border relative">
          <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[25px] text-[#5F35F5]" />
          <input
            type="text"
            className="w-full bg-white border-t-0  rounded-full shadow-xl py-4 px-[60px]"
            placeholder="Search"
            onChange={handleGroupSearch}
          />
          <BsThreeDotsVertical className="absolute top-1/2 -translate-y-1/2 right-[25px] text-[rgb(95,53,245)]" />
        </div> 
  
        <div className="mt-7 border border-t-0 rounded-lg shadow-lg h-[332px]">
          <div className="flex items-center justify-between  px-[25px] py-3">
            <h4 className="text-xl font-semibold font-poppins">My Groups</h4>
            <Button text="Create Group" className="rounded-lg px-1 py-1" onClick = {handleCreateGroup}/>
          </div>
  
          <div className="h-[280px] overflow-scroll">
  
           {
            groupSearchInput.length > 0
            ?
            groupSearchStore.length > 0
            ?
            groupSearchStore.map(item=>(
             <SingleUser profileName={item.groupName} profileText={item.groupTag} 
             src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar.png?alt=media&token=bc88b149-aad3-442b-a34f-975ae6098ec0"
             buttonOneText= "Add Member" 
             buttonOneClick={()=>handleGroupAddMember(item)}
             />
            ))
            :
            <SingleUser extraLabel="No Group exist" className="text-[26px] text-red-600 font-bold font-nunito"
            src= "https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar.png?alt=media&token=bc88b149-aad3-442b-a34f-975ae6098ec0"/>
            :
            groupList.map(item=>(
             <SingleUser profileName={item.groupName} profileText={item.groupTag} 
             src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar.png?alt=media&token=bc88b149-aad3-442b-a34f-975ae6098ec0"
             buttonOneText= "Add Member" 
             buttonOneClick={()=>handleGroupAddMember(item)}
             />
            ))
           }
          
          {/* Create group popup design */}
           {
            groupPopUp && 
            <div onClick={handelCreateGroupUi}
            className="absolute inset-0 flex justify-center items-center bg-black/70 z-20"
          >
            <div ref={groupRef} className="w-[600px] max-h-[90vh]  bg-white rounded-2xl">
              <h1 className="text-[50px] font-nunito font-bold flex justify-center items-center mt-[30px] text-blue-500">
                Create A New Group
              </h1>

             <div className='flex my-10 gap-5 items-center justify-center'>
              <TextField
              label="Group Name"
              value={myGroupName}
              id="outlined-basic"
              placeholder="ABC"
              variant="outlined"
              sx={{ width: "40%" }}
              onChange={(event)=>setMyGroupName(event.target.value)}
              />
              <TextField
              label="Group Tag"
              value={myGroupTag}
              id="outlined-basic"
              variant="outlined"
              sx={{ width: "40%" }}
              onChange={(event)=>setMyGroupTag(event.target.value)}
              />

             </div>

              <div className="flex gap-6 items-center justify-center my-[40px] ">
                <Button
                  text="Cancel"
                  onClick ={()=>setGroupPopUp(false)}
                  className="rounded-lg bg-purple-600 h-[50px] w-[180px] text-2xl font-nunito font-bold"
                  
                />
                <Button
                  text="Create"
                  onClick = {handleCreate}
                  className="rounded-lg bg-purple-600 h-[50px] w-[180px] text-2xl font-nunito font-bold"
                />

              </div>
            </div>
           </div>
           }

           {/* Add member popup design */}
           {
            addMemberPopUp && 
            <div onClick={handleAddMemberUi}
            className="absolute inset-0 flex justify-center items-center bg-black/70 z-20"
          >
            <div ref={memberRef} className="w-[600px] max-h-[90vh]  bg-white rounded-2xl">
              <h1 className="text-[50px] font-nunito font-bold flex justify-center items-center mt-[30px] text-blue-500">
                Add New Member
              </h1>

              {
              userInfo.map(item=>(
              <SingleUser profileName={item.username} profileText={item.email} src="https://firebasestorage.googleapis.com/v0/b/friendshub-2af50.firebasestorage.app/o/avatar2.webp?alt=media&token=e7ec9f91-5fc8-4d51-8833-ea662cecc94b"
              buttonOneText="Add Member" buttonOneClick={()=>handleAddMember(item)}/> 
              ))
              }

              <div className="flex gap-6 items-center justify-center my-[40px] "> 
                <Button
                  text="Cancel"
                  onClick ={()=>setAddMemberPopUp(false)}
                  className="rounded-lg bg-purple-600 h-[50px] w-[180px] text-2xl font-nunito font-bold"
                  
                />
                <Button
                  text="Add"
                  onClick = {handleAdd}
                  className="rounded-lg bg-purple-600 h-[50px] w-[180px] text-2xl font-nunito font-bold"
                />
              </div>
               

            </div>
           </div>
           }
    
          </div>
        </div>
   </>
  )
}

export default MyGroups