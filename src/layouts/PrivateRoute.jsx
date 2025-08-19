import React from 'react'
import { Navigate } from 'react-router-dom'

// This route is for protecting the app from everyone so that anyone can not enter without login to the app . Registration and login page will remain under public route as usual. 

const PrivateRoute = ({children}) => {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"))

  if(!userInfo){
    return <Navigate to= "/login" replace/>
  }
  

  return (
    children
  )
}

export default PrivateRoute