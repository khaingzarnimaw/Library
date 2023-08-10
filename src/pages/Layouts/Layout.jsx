import React from "react";
import { Outlet } from "react-router";
import Navbar from "../../components/Navbar";

const Layout = () => {
  return (
    <div>
      
      <Navbar/>
      {/* dynamic route changes content */}
     <div className="max-w-6xl mx-auto p-3">
     <Outlet />
     </div>
    </div>
  );
};

export default Layout;
