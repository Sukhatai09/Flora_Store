import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import topLogo from "../assets/Flora-logo.png";
import useAuthStore from "../store/authStore";

const Layout: React.FC = () => {
  const user = useAuthStore((state) => state.user);
  return (
    <div>
      <div>
        <div className="bg-[#F8DAE2] w-full h-[70px] flex justify-center items-center fixed top-0 z-10">
          <img src={topLogo} alt="Logo" className="h-full w-auto" />
          <h1 className="ml-3 text-2xl text-[#ed51b1] font-bold ">FLORA</h1>
          <h1 className="ml-3 text-1xl text-[#ed51b1] font-bold absolute right-5">ADMIN : {user?.first_name.toUpperCase()}</h1>
        </div>
        <div className="fixed top-[70px] left-0 z-20">
          <Sidebar />
        </div>
      </div>
      <div className="ml-[300px] mt-[70px]  min-h-screen">
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
