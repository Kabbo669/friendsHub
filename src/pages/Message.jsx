import React from "react";
import Flex from "../components/Flex";
import GroupList from "../layouts/GroupList";
import FriendList from "../layouts/FriendList";
import Image from "../assets/avatar2.webp";
import Image2 from "../assets/nishat2.jpg"
import { BsThreeDotsVertical } from "react-icons/bs";
import { RiEmojiStickerLine } from "react-icons/ri";
import { FaCameraRetro, FaTelegramPlane } from "react-icons/fa";
import ModalImage from "react-modal-image";


const Message = () => {
  return (
    <>
      <div className="w-full h-screen flex  overflow-hidden">
        <Flex className="gap-y-10 mt-7 flex-col">
          <div className="w-[520px] mb-0">
            <GroupList headerText="Groups" />
          </div>

          <div className="mt-[-15px] w-[520px]">
            <FriendList />
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
                  Robiul
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
            <div className="mt-7 relative inline-block">
              <div className=" bg-[#e3e2e2] rounded-r-md rounded-tl-md inline-block max-w-[500px]">
                <p className="px-10 py-4 text-base font-medium font-nunito break-words">
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Officia, unde expedita accusamus facere est assumenda vero
                  commodi aut autem cupiditate, cum velit, obcaecati odio ad
                  suscipit eius numquam inventore? Nobis obcaecati eos ex ?
                </p>
              </div>
              
              {/* Tooltip design */}
              <div className="absolute border-t-[14px] border-r-[15px] border-t-transparent border-r-[#e3e2e2] left-0 bottom-[22px] -translate-x-2/3"></div>
              <p className="text-[12px] text-[#969595] font-poppins pt-1">
                Today, 2:01 pm
              </p>
            </div>
            <div className="w-[70%] h-auto my-[30px]">
              <ModalImage
               small={Image2}
               large={Image2}
               alt="Hello World!"
               className="w-full h-full"
              />
              <div className="flex justify-start">
                 <p className="text-[12px] text-[#969595] font-poppins pt-1">
                Today, 2:01 pm
              </p>
              </div>
              </div>
             
            {/* Sender text design End */}

            {/* Receiver text design start */}


            <div className="flex flex-col items-end justify-end mt-7">
              <div className="flex relative ">
                <div className="bg-[#5F35F5] rounded-l-md rounded-tr-md max-w-[500px] inline-block">
                  <p className="text-base text-white font-medium font-nunito px-10 py-4 break-words">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Quo dolores ipsa, nesciunt id omnis quam officia numquam ad
                    ut nobis nulla sint eaque molestias tenetur.
                  </p>
                  
                </div>
                {/* Tooltip design */}
                <div className="absolute border-b-[14px] border-r-[15px] border-r-transparent border-b-[#5F35F5] right-[-12px] bottom-0"></div>
              </div>
              <p className="text-[12px] text-[#969595] font-poppins   pt-1">
                Today, 2:10 pm{" "}
              </p>
            </div>
             <div className="my-[30px] flex justify-end items-end">
              <div className="w-[70%] h-auto">
              <ModalImage
               small={Image2}
               large={Image2}
               alt="Hello World!"
               className="w-full h-full"
              />
               <p className="flex justify-end items-end text-[12px] text-[#969595] font-poppins pt-1">
                Today, 2:01 pm
              </p>
              </div>
             </div>
            {/* Receiver text design End */}
          </div>

          {/* Input and sending message and other design start */}
          <div>
            <div className="relative">
              <input
                type="text"
                placeholder="Enter your text"
                className="text-lg w-[91%] py-2 pl-5 pr-[90px] bg-slate-100"
              />
              <div className="absolute flex top-0 left-[84%] translate-y-1/2 gap-3 items-center">
                <RiEmojiStickerLine className="text-[21px] text-[#636262]" />
                <FaCameraRetro className="text-[18px] text-[#636262]" />
              </div>
            </div>
            <div className="absolute right-[7%] bottom-[14px] bg-[#5F35F5] px-[12px] py-[10px] rounded-md">
              <FaTelegramPlane className="text-[20px] text-white" />
            </div>
          </div>
          {/* Input and sending message and other design end */}
        </div> 
      </div>
    </>
  );
};

export default Message;
