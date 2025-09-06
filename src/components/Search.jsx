import React from 'react'
import { BsThreeDotsVertical } from 'react-icons/bs'
import { FaSearch } from 'react-icons/fa'

const Search = ({isActive, onChange}) => {
  return (
     <div className="box-border relative">
              {
                isActive &&
                <span>
                  <FaSearch className="absolute top-1/2 -translate-y-1/2 left-[25px] text-[#5F35F5]" />
                <input
                type="text"
                className="w-full bg-white border-t-0  rounded-full shadow-xl py-4 px-[60px]"
                placeholder="Search"
                onChange={onChange}
              />
                </span>
              }
              <BsThreeDotsVertical className="absolute top-1/2 -translate-y-1/2 right-[25px] text-[#5F35F5]" />
            </div> 
  )
}

export default Search