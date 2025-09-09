import React from 'react'

const ReceiverMessage = ({ text, timesTap}) => {
  
  return (
    
    <div className="flex flex-col items-end justify-end mt-7">
              <div className="flex">
                {
                  text &&
                  <div className="bg-[#5F35F5] rounded-l-md rounded-tr-md max-w-[500px] inline-block relative">
                  <p className="text-base text-white font-medium font-nunito px-10 py-4 break-words">{text}</p>

                  <div className="absolute border-b-[14px] border-r-[15px] border-r-transparent border-b-[#5F35F5] right-[-12px] bottom-0"></div>
                </div>
                } 
                  
                </div>
                {/* Tooltip design */}
                
              {
                timesTap && 
                <p className="text-[12px] text-[#969595] font-poppins   pt-1">{new Date(timesTap).toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"})}</p>
              }
     </div>
  )
}

export default ReceiverMessage