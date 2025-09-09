import { configureStore } from '@reduxjs/toolkit'
import   userInfoSlice  from './slices/userInfoSlice'
import  MessageSlice  from './slices/MessageSlice'

export default configureStore({
  reducer: {
  activeUser : userInfoSlice,
  userMessage : MessageSlice
  },
})