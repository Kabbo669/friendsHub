import React, { useEffect, useRef, useState } from "react";
import Flex from "../components/Flex";
import GroupList from "../layouts/GroupList";
import FriendList from "../layouts/FriendList";
import Image from "../assets/avatar2.webp";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaCameraRetro, FaTelegramPlane } from "react-icons/fa";
import SenderMessage from "../components/SenderMessage";
import ReceiverMessage from "../components/ReceiverMessage";
import SenderImage from "../components/SenderImage";
import ReceiverImage from "../components/ReceiverImage";
import { useDispatch, useSelector } from "react-redux";
import { chat } from "../slices/MessageSlice";
import { getDatabase, onValue, push, ref, set } from "firebase/database";
import { FcBiotech } from "react-icons/fc";
import { IoArrowBack } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { RxCross2 } from "react-icons/rx";
import { getDownloadURL, getStorage, ref as Sref, uploadBytes } from "firebase/storage";
import EmojiPicker from 'emoji-picker-react';


const Message = () => {
  const db = getDatabase();
  const storage = getStorage();
  const bottomRef = useRef(null);

  const [input, setInput] = useState("");
  let [allMessage, setAllMessage] = useState([]);
  let [messagePopUp, setMessagePopUp] = useState(false);
  let [sendImageMessage, setSendImageMessage] = useState("")
  let [emoji, setEmoji] = useState(false)

  let user = useSelector((state) => state.activeUser.value);
  // console.log(user.uid);
  // console.log(user.displayName);

  let chatData = useSelector((state) => state.userMessage.value);
  console.log(chatData);

  let dispatch = useDispatch();

  let handleMessage = (friend) => {
    // console.log(friend);
    setMessagePopUp(true);
    dispatch(
      chat({
        ...friend,
        status: "single",
      })
    );
    localStorage.setItem(
      "singleMessage",
      JSON.stringify({...friend, status: "single"})
    );
  };

  let handleCross = () => {
    setMessagePopUp(false);
  };

  let handleSendMessage = () => {

    if (chatData?.status !== "single") {
      console.log("Data did not sent")
      return
    }
      // If there is no selected friend ? will prevent crashing
     if(input && !sendImageMessage){
        set(push(ref(db, "singleMessage/")), {
        senderId: user.uid,
        senderName: user.displayName,
        receiverId: chatData.id,
        receiverName: chatData.name,
        message: input,
        date: new Date().toISOString(),
        // date2: `${new Date().getFullYear()} - ${new Date().getMonth() + 1} - ${new Date().getDate()} `

        // chatData.id and chatData.name comes from friend where it has been sent as id: friendId, name: friendName
      }).then(() => {
        setInput("");
        setSendImageMessage("")
      });
     }else if(sendImageMessage){
      // Sending Image using handleSendMessage button code start
       const storageRef = Sref(storage, "some-child");
       uploadBytes(storageRef, sendImageMessage).then((snapshot) => {
       getDownloadURL(storageRef).then((downloadURL) => {
        // console.log("File available at", downloadURL);
        set(push(ref(db, "singleMessage/")), {
        senderId: user.uid,
        senderName: user.displayName,
        receiverId: chatData.id,
        receiverName: chatData.name,
        image:downloadURL ,
        date: new Date().toISOString(), 
       }).then(() => {
        setInput("");
        setSendImageMessage("")
      });
     });
    });
     // Sending Image using handleSendMessage button code end
     }
  };

  let handleImge = (event) => {
    setSendImageMessage(event.target.files[0]); 
  }


  useEffect(() => {
    const singleMessageRef = ref(db, "singleMessage/");
    onValue(singleMessageRef, (snapshot) => {
      let messages = [];
      snapshot.forEach((item) => {
        if (
          (item.val().senderId == user.uid &&
            item.val().receiverId == chatData.id) ||
          (item.val().senderId == chatData.id &&
            item.val().receiverId == user.uid)
        ) {
          messages.push({ ...item.val(), id: item.key });
        }
      });
      setAllMessage(messages);
    });
  }, [chatData, user.uid, db]);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [allMessage]);

  let handleEmoji =()=>{
    setEmoji(!emoji)
  }

  return (
    <>
      <div className="w-full h-screen flex  overflow-hidden">
        <Flex className="gap-y-10 mt-7 flex-col">
          <div className="w-[520px] mb-0">
            <GroupList headerText="Groups" />
          </div>

          <div className="mt-[-15px] w-[520px]">
            <FriendList buttonOneText="Message" onChatClick={handleMessage} />
          </div>
        </Flex>

        {messagePopUp ? (
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
                    {chatData && chatData.name}
                  </h3>
                  <p className="text-sm font-nunito">Online</p>
                </div>
              </div>
              <div className="text-[30px] mr-2">
                <RxCross2 onClick={handleCross} />
              </div>
              <span className="absolute border-b w-full border-[#8a8888] top-[92px] shadow-lg"></span>
            </div>
            <span className="absolute w-[88%] border-b border-b-[#8a8888] bottom-[60px]"></span>

            <div className="h-[90%] overflow-y-auto my-3 px-5">
              {/* Sender text design start */}
              {allMessage.map((item) =>
                item.senderId === user.uid
                 ? 
                 item.image?
                 <SenderImage image={item.image} timesTap={item.date}/>
                 :
                  <SenderMessage
                    key={item.id}
                    text={item.message}
                    timesTap={item.date}
                  />
                 : 
                 item.image
                 ?
                 <ReceiverImage image={item.image} timesTap={item.date}/>
                 :
                  <ReceiverMessage
                    key={item.id}
                    text={item.message}
                    timesTap={item.date}
                  />
                
              )}

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
                  onChange={(event) => setInput(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && input.trim() !== "") {
                      event.preventDefault();
                      handleSendMessage();
                    }
                  }}
                />
                <div className="absolute flex top-0 left-[84%] translate-y-1/2 gap-3 items-center">

                   
                    <RiEmojiStickerLine className="relative text-[21px] text-[#636262]" onClick={handleEmoji}/>
                   {
                    emoji &&
                     <div className="absolute bottom-[36px] right-[-135px]">
                     <EmojiPicker />
                    </div>
                   }
                   
                

                  <label htmlFor="image">
                    <input
                      id="image"
                      type="file"
                      onChange={handleImge}
                      className="hidden"
                      accept="image/*"
                    />
                    <FaCameraRetro
                      className="text-[18px] text-[#636262] cursor-pointer"
                    />
                  </label>
                </div>
              </div>
              <div
                className="absolute right-[7%] bottom-[14px] bg-[#5F35F5] px-3 py-[10px] rounded-md"
                onClick={handleSendMessage}
              >
                <FaTelegramPlane className="text-[20px] text-white" />
              </div>
            </div>
            {/* Input and sending message and other design end */}
          </div>
        ) : (
          <div className="relative w-2/3 h-[94vh] mx-10 my-auto rounded-lg px-12 py-8 box-border shadow-lg pb-[100px] flex items-center justify-center">
            <div className="flex items-center justify-center gap-10">
              <FcBiotech className="h-[80px] w-[80px] animate-spinPause" />
              <h1 className="text-blue-500 text-[60px] font-bold font-dm">
                Click on Message to Chat
              </h1>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default Message;
