import { createSlice } from '@reduxjs/toolkit'

export const MessageSlice = createSlice({
  name: 'message',
  initialState: {
  value:localStorage.getItem("singleMessage")? JSON.parse(localStorage.getItem("singleMessage")): null
  },
  reducers: {
    chat: (state,action) => {
     state.value = action.payload 
    //  console.log(action.payload);
    },
  },
  
})

export const { chat } = MessageSlice.actions

export default MessageSlice.reducer