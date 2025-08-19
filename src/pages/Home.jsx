import React from 'react'
import Flex from '../components/Flex'
import UserList from '../layouts/UserList'

const Home = () => {
  return (
  <>
   <Flex className= "gap-5 mt-7 mr-5">
   
   <div className='w-1/3 h-[350px]'><UserList/></div>

   <div className='w-1/3 h-[350px]'><UserList/></div>

   <div className='w-1/3 h-[350px'><UserList/></div>

   </Flex>
 </>
  )
}

export default Home