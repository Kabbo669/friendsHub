import React from "react";
import UserImage from "../assets/nishat2.jpg";

const SingleUser = ({isLast, profileName, profileText, buttonText}) => {
  return (
    <>
      <div className="relative flex items-center mb-[14px] pt-[17px]">
        <div className="h-[60px] w-[70px] ml-[20px]">
          <img src={UserImage} alt="" className="w-full h-full rounded-full" />
        </div>
        <div className="flex items-center justify-between w-full pr-[40px]">
          <div className="pl-[14px]">
            <h4 className="text-[18px] font-poppins font-semibold">
              {profileName}
            </h4>
            <p className="text-[14px] font-poppins font-normal text-[#4D4D4D]">
              {profileText}
            </p>
          </div>

          <div>
            <button className="bg-[#5F35F5] text-[#FFFFFF] px-[23px] rounded text-[20px] font-semibold font-poppins">
              {buttonText}
            </button>
          </div>
        </div>
        {
          !isLast && 
          <span className="absolute w-[455px] bg-[#000000] top-[95px] left-[20px] border-b"></span>
        }
      </div>
    </>
  );
};

export default SingleUser;

// To remove the span from last child needs to use condition like {!isLast && <span className="absolute w-[455px] bg-[#000000] top-[95px] left-[20px] border-b"></span>} and have to say isLast = {false} or isLast = {true}
