import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userInfo } from '../slices/userInfoSlice'

const Home = () => {
  
  let navigate = useNavigate()
  let userData = useSelector(state=>state.activeUser.value)
  console.log(userData);
  let dispatch = useDispatch(userInfo(userData.user))
   

  useEffect(()=>{
  if(!userData){
    navigate('/login')
  }
  },[])

  let handleLogout=()=>{
    localStorage.removeItem("userInfo")
    dispatch(userInfo(null))
    navigate('/login')
  }



  return (
    <div>
      <h3 className='text-2xl text-white font-bold font-nunito cursor-pointer' onClick={handleLogout}>Logout</h3>
    </div>
  )
}

export default Home