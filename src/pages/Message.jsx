import React, { useEffect, useRef, useState } from "react";
import Flex from "../components/Flex";
import GroupList from "../layouts/GroupList";
import FriendList from "../layouts/FriendList";
import Image from "../assets/avatar2.webp";
import Image2 from "../assets/nishat2.jpg";
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaCameraRetro, FaTelegramPlane } from "react-icons/fa";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderImage from "../components/SenderImage";
import ReceiverImage from "../components/ReceiverImage";
import { useDispatch, useSelector } from "react-redux";
import {chat} from '../slices/MessageSlice';
import { getDatabase, onValue, push, ref, set } from "firebase/database";

const Message = () => {
    const db = getDatabase();
    const bottomRef = useRef(null)

  const [selectedFriend, setSelectedFriend] = useState("")
  const [input, setInput] = useState("")
  let  [allMessage, setAllMessage] = useState([])

  let user = useSelector((state)=>state.activeUser.value)
  // console.log(user.uid);
  // console.log(user.displayName);

  let chatData = useSelector((state)=>state.userMessage.value)
  console.log(chatData);

  let dispatch = useDispatch()

  let handleMessage=(friend)=>{
    // console.log(friend);
    setSelectedFriend(friend);
    dispatch(chat({
      ...friend, status: "single"
    }))
    localStorage.setItem("singleMessage", JSON.stringify({
      ...friend, status: "single"
    }))
  }

  let handleSendMessage=()=>{ 
    if(chatData?.status === "single"){
      // If there is no selected friend ? will prevent crashing
     set(push(ref(db, 'singleMessage/')), {
      senderId: user.uid,
      senderName : user.displayName,
      receiverId: chatData.id,
      receiverName: chatData.name, 
      message : input,
      date: new Date().toISOString()

      // chatData.id and chatData.name comes from friend where it has been sent as id: friendId, name: friendName
  }).then(()=>{
    setInput("")
  }) 
    }else{
      console.log("Data not sent");
    }
  }

  useEffect(()=>{
  const singleMessageRef = ref(db, 'singleMessage/');
  onValue(singleMessageRef, (snapshot) => {
    let messages = []
    snapshot.forEach((item)=>{
    if((item.val().senderId == user.uid && item.val().receiverId == chatData.id) ||
    (item.val().senderId == chatData.id && item.val().receiverId == user.uid)){
    messages.push({...item.val(), id:item.key})
    }
    })
    setAllMessage(messages)
  });
},[])

 useEffect(()=>{
  if(bottomRef.current){
    bottomRef.current.scrollIntoView({behavior : "smooth"})
  }
 },[allMessage])
  
  return (
    <>
      <div className="w-full h-screen flex  overflow-hidden">
        <Flex className="gap-y-10 mt-7 flex-col">
          <div className="w-[520px] mb-0">
            <GroupList headerText="Groups" />
          </div>

          <div className="mt-[-15px] w-[520px]">
            <FriendList buttonOneText= "Message" onChatClick={handleMessage}/>
          </div>
        </Flex>

        <div className="relative w-2/3 h-[94vh] mx-10 my-auto rounded-lg px-12 py-8 box-border shadow-lg pb-[100px]">
          <div className="relative flex items-center justify-between shadow-lg rounded-md pb-3">
            <div className="flex items-center gap-6">
              <div className="relative w-[80px] h-[80px] rounded-full bg-red-200 shadow-lg ml-2">
                <img
                  src={Image}
                  alt="Profile Image"
                  className="h-full w-full"
                />
                <span className="absolute h-[10px] w-[10px] bg-green-500 rounded-full right-0 top-[50px]"></span>
              </div>
              <div>
                <h3 className="text-xl font-bold font-nunito text-black">
                  {chatData ? chatData.name : "Select a friend"}
                </h3>
                <p className="text-sm font-nunito">Online</p>
              </div>
            </div>
            <div className="text-[30px] mr-2">
              <BsThreeDotsVertical />
            </div>
            <span className="absolute border-b w-full border-[#8a8888] top-[92px] shadow-lg"></span>
          </div>
          <span className="absolute w-[88%] border-b border-b-[#8a8888] bottom-[60px]"></span>

          <div className="h-[90%] overflow-y-auto my-3 px-5">
            {/* Sender text design start */}
           {
            allMessage.map((item)=>(
             item.senderId === user.uid
             ? 
             <SenderMessage key={item.id} text={item.message} timesTap={item.date}/>
             :
             <ReceiverMessage key={item.id} text={item.message} timesTap={item.date}/>
            ))
           }
          

           

            {/* Sender text design End */}

            {/* Receiver text design start */}

            {/* <ReceiverImage
              image={Image2}
              timesTap="Today, 4:20 pm"
            /> */}
            {/* Receiver text design End */}
            <div ref={bottomRef}></div>
          </div>

          {/* Input and sending message and other design start */}
          <div>
            <div className="relative">
              <input
                type="text"
                value={input}
                placeholder="Enter your text"
                className="text-lg w-[91%] py-2 pl-5 pr-[90px] bg-slate-100"
                onChange={(event)=>setInput(event.target.value)}
              />
              <div className="absolute flex top-0 left-[84%] translate-y-1/2 gap-3 items-center">
                <RiEmojiStickerLine className="text-[21px] text-[#636262]" />
                <FaCameraRetro className="text-[18px] text-[#636262]" />
              </div>
            </div>
            <div className="absolute right-[7%] bottom-[14px] bg-[#5F35F5] px-[12px] py-[10px] rounded-md">
              <FaTelegramPlane onClick={handleSendMessage} className="text-[20px] text-white" />
            </div>
          </div>
          {/* Input and sending message and other design end */}
        </div>
      </div>
    </>
  );
};

export default Message;
