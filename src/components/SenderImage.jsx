import React from 'react'
import Image2 from "../assets/nishat2.jpg"
import ModalImage from "react-modal-image";

const SenderImage = ({ timesTap, image}) => {

  return (
    <div className="w-[70%] h-auto my-[30px]">
              {
              image &&
                <ModalImage
                small={image} 
                large={image}
                alt="Sender Image"
                className="w-full h-full"
                />
              }
              {
                timesTap && 
                <div className="flex justify-start">
                 <p className="text-[12px] text-[#969595] font-poppins pt-1">{timesTap}</p>
              </div>
              }
     </div>
  )
}

export default SenderImage