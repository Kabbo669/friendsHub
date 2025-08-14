import React from "react";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import Flex from "../components/Flex";
import Button from "../components/Button";

const RootLayout = () => {
  return (
    <section>
      <Flex>
        <div className="w-2/12 bg-red-400">
          <Sidebar />
        </div>
        
        <div className="w-10/12 bg-blue-500">
          <Outlet />
        </div>
      </Flex>
    </section>
  );
};

export default RootLayout;
