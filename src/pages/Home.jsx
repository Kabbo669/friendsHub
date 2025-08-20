import React from 'react'
import Flex from '../components/Flex'
import UserList from '../layouts/UserList'
import GroupList from '../layouts/GroupList'
import FriendList from '../layouts/FriendList'
import FriendRequest from '../layouts/FriendRequest'
import MyGroups from '../layouts/MyGroups'
import BlockList from '../layouts/BlockList'

const Home = () => {
  return (
  <>
   <Flex className= "gap-5 mt-7 mr-5">
   
   <div className='w-1/3 h-[250px]'><GroupList/></div>

   <div className='w-1/3 h-[250px]'><FriendList/></div>

   <div className='w-1/3 h-[250px'><UserList/></div>
   </Flex>

   <Flex className= "gap-5 mt-7 mr-5">
   
   <div className='w-1/3 h-[250px]'><FriendRequest/></div>

   <div className='w-1/3 h-[250px]'><MyGroups/></div>

   <div className='w-1/3 h-[250px]'><BlockList/></div>
   </Flex>
 </>
  )
}

export default Home