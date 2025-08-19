import React from "react";
import { Outlet } from "react-router-dom";
import Flex from "../components/Flex";
import Sidebar from "../components/Sidebar";


const RootLayout = () => {
  return (
    <section className="flex items-start">
      
        <div className="w-2/12 h-screen">
          <Sidebar/>
        </div>
        
        <div className="w-10/12 h-screen">
          <Outlet />
        </div>
      
    </section>
  );
};

export default RootLayout;
