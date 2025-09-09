import React from 'react'
import { Link } from 'react-router-dom' 

const SidebarLink = ({name, activeValue, icon }) => {
  let Icon = icon;
  let isActive = activeValue === name; 

  // This is the shorhand formula for active value.


  return (
    <Link to={`/pages/${name}`} className='relative z-10'>
     {
      isActive 
      &&
      <>
      <span className="absolute bg-white w-[157px] h-[90px] top-[-18px] left-[-8px] rounded-tl-2xl rounded-bl-2xl -z-10 "></span>

      <span className="absolute bg-red-700 w-[25px] h-[90px] left-[128px] top-[-18px] rounded-bl-3xl rounded-tl-3xl"></span>
     </>
     }
     <Icon className = {isActive ? "text-blue-600" : "text-white"}/>
    </Link>
  )
}

export default SidebarLink