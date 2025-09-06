import React from "react";
import UserImage from "../assets/nishat2.jpg";

const SingleUser = ({isLast, profileName, profileText, buttonOneText,buttonTwoText, buttonOneClick,buttonTwoClick, className, blockedBy, extraLabel, src}) => {
  return (
    <>
      <div className="relative flex items-center mb-[14px] pt-[17px]">
        <div className="h-[70px] w-[70px] ml-[20px] shrink-0">
          <img src={src} alt="" className="w-full h-full rounded-full" />
        </div>
        <div className="flex items-center justify-between w-full pr-[40px]">
          <div className="pl-[14px]"> 
            <h4 className="text-[18px] font-poppins font-semibold">
              {profileName}
            </h4>
            {
              extraLabel && <span className={`text-[16px] font-poppins font-semibold ${className}` }>{extraLabel}</span>
            }
            <h4 className="text-[18px] font-poppins font-semibold">
              {blockedBy}
            </h4>
            <p className="text-[14px] font-poppins font-normal text-[#4D4D4D]">
              {profileText}
            </p>
          </div>

          <div className="flex gap-2">
            {
              buttonOneText &&
              <button className= {`bg-[#5F35F5] text-[#FFFFFF] px-[23px] rounded text-[20px] font-semibold font-poppins ${className}`} onClick={buttonOneClick}>
              {buttonOneText}
            </button> 
            }
            {
              buttonTwoText &&
              <button className= {`bg-[#5F35F5] text-[#FFFFFF] px-[23px] rounded text-[20px] font-semibold font-poppins ${className}`} onClick={buttonTwoClick}>
              {buttonTwoText}
            </button>
            }
          </div>

        </div>
        {
          !isLast && 
          <span className="absolute w-[455px] border-b bg-[#000000] top-[95px] left-[20px]"></span>
        }
      </div>

      {/* // To remove the span from last child needs to use condition like {!isLast && <span className="absolute w-[455px] bg-[#000000] top-[95px] left-[20px] border-b"></span>} and have to say isLast = {false} or isLast = {true} */}
    </>
  );
};

export default SingleUser;


