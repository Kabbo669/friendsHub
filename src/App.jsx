import React from 'react'
import Login from './pages/Login'
import Registration from './pages/Registration'
import RootLayout from './layouts/RootLayout'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
} from "react-router-dom";
import Message from './pages/Message';
import Setting from './pages/Setting';
import Notification from './pages/Notification';
import Home from './pages/Home';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Registration />}></Route>
    <Route path="/login" element={<Login />}></Route>
    <Route path="/pages" element={<RootLayout />}>
      <Route path="home" element={<Home />}></Route>
      <Route path="message" element={<Message />}></Route>
      <Route path="setting" element={<Setting />}></Route>
      <Route path="notification" element={<Notification />}></Route>
    </Route>
    
    </>
     )
   );

const App = () => {
  return (
    <>
     <RouterProvider router={router} />
    </>
    
  )
}

export default App