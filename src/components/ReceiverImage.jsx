import moment from 'moment';
import React from 'react'
import ModalImage from "react-modal-image";

const ReceiverImage = ({image,timesTap}) => {
  return (
   <div className="my-[30px] flex justify-end items-end">
              <div className="w-[70%] h-auto">
              { 
              image &&
                <ModalImage
                small={image}
                large={image}
                alt="Hello World!"
                className="w-full h-full"
               />
               }
               {
                timesTap &&
                 <p className="flex justify-end items-end text-[12px] text-[#969595] font-poppins pt-1">{moment(timesTap).calendar(null, {
                  sameDay : "[Today] h:mm A",
                  lastDay: "[Yesterday] h:mm A",
                  lastWeek: "dddd h:mm A",
                  sameElse: "DD/MM/YYYY h:mm A"
                 })}</p>
               }
              </div>
             </div>
  )
}

export default ReceiverImage