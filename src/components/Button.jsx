import React from 'react'
import Flex from '../components/Flex'

const Button = ({className, text, ...props}) => {
  return (
    
     <Flex>
       <button className= {`bg-blue-500 px-5 py-2 text-lg border border-transparent hover:bg-transparent hover:text-black hover:border-black duration-300 font-semibold text-white ${className}`}{...props}>{text}</button>
     </Flex>
  
  )
}

export default Button