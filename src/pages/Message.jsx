import React from "react";
import Flex from "../components/Flex";
import GroupList from "../layouts/GroupList";
import FriendList from "../layouts/FriendList";
import Image from "../assets/avatar2.webp";
import { BsThreeDotsVertical } from "react-icons/bs";

const Message = () => {
  return (
    <>
      <div className=" w-full h-screen flex overflow-hidden">
        <Flex className="gap-y-10 mt-7 flex-col">
          <div className="w-[520px] mb-0">
            <GroupList headerText="Groups" />
          </div>

          <div className="mt-[-15px] w-[520px]">
            <FriendList />
          </div>
        </Flex>

        <div className="relative w-2/3 h-[94vh] mx-10 my-auto rounded-lg shadow-lg px-12 py-8 box-border">
          <div className="relative flex  items-center justify-between">
            <div className="flex items-center gap-6">
              <div className="relative w-[80px] h-[80px] rounded-full bg-red-200 shadow-lg">
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
            <div className="text-[30px]">
              <BsThreeDotsVertical />
            </div>
            <span className="absolute border-b w-full border-[#8a8888] top-[90px]"></span>
          </div>

          <div className="mt-9">
            <div className=" bg-[#e3e2e2] rounded-r-md rounded-tl-md inline-block">
              <p className="py-[6px] px-6 text-base font-normal font-nunito">Hey There !</p>
            </div>
            <div className="absolute border-t-[11px] border-r-[9px] border-t-transparent border-r-[#e3e2e2] top-[173px] left-[40px]"></div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Message;
