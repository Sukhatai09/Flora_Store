import React from "react";
import { Link } from "react-router-dom";
import cart from "../assets/cart.png";
import order from "../assets/order.png";
import logout from "../assets/logout.png";

const Sidebar: React.FC = () => {
  return (
    <div className="bg-[#FFCFDA] w-[300px] h-screen ">
      <div>
        <div className="flex pt-36 ml-8 h-[70px]   ">
          <Link to="/admin" className="flex items-center gap-3 p-4 ">
            <img src={cart} className="w-[50px] h-[50px]" />
            <h1 className="flex items-center gap-3 bg-[#f43e78f4] hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-full shadow-xl font-bold transition duration-300 transform hover:scale-105">Add & Edit</h1>
          </Link>
        </div>
      </div>
      <div>
        <div className="flex pt-36 ml-6 h-[70px]  ">
          <Link to="/admin/confirmorder" className="flex items-center gap-2 p-4">
            <img src={order} className="w-[70px] h-[70px]" />
            <h1 className="flex items-center gap-2 bg-[#f43e78f4] hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-full shadow-xl font-bold transition duration-300 transform hover:scale-105">Check Order</h1>
          </Link>
        </div>
      </div>

      <div className="flex justify-center mt-60">
        <button
          // onClick={handleLogout}
          className="flex items-center gap-3 bg-[#f00784] hover:bg-pink-700 text-white text-lg px-6 py-3 rounded-full shadow-xl font-bold transition duration-300 transform hover:scale-105"
        >
          <img src={logout} className="w-[28px] h-[28px]" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
