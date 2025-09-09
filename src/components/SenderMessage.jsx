import React from 'react'

const SenderMessage = ({text,timesTap}) => {
  
  return (
    
     <div className="mt-7">
              {
                text &&
                <div className="relative inline-block bg-[#e3e2e2] rounded-r-md rounded-tl-md max-w-[500px]">
                <p className="px-10 py-4 text-base font-medium font-nunito break-words">{text}</p>
                <div className="absolute border-t-[14px] border-r-[15px] border-t-transparent border-r-[#e3e2e2] left-0 bottom-0 -translate-x-2/3"></div>
              </div>
              }
              
              
              {/* Tooltip design */}
            
              {
                timesTap && <p className="text-[12px] text-[#969595] font-poppins pt-1">{new Date(timesTap).toLocaleTimeString([], {hour : "2-digit", minute: "2-digit"})}</p>
              }
     </div>
  )
}

export default SenderMessage
