import React from 'react'
import topLogo from "../../assets/Flora-logo.png";



const Login: React.FC = () => {

  return (
    <div className="bg-gradient-to-br from-pink-100 to-pink-200 min-h-screen">
      {/* Header */}
      <div className="bg-[#FDE2F3] w-full h-[70px] flex justify-center items-center fixed top-0 z-10 shadow-md">
        <img src={topLogo} alt="Logo" className="h-full w-auto animate-pulse" />
        <h1 className="ml-3 text-3xl text-[#ed51b1] font-extrabold font-cursive">FLORA</h1>
      </div>

      {/* Form */}
      <div className="flex justify-center items-center h-screen pt-10">
        <div className="bg-[#FFC6E8] px-10 py-12 rounded-3xl shadow-2xl w-[400px] border-4 border-white border-dashed">
          <h2 className="text-4xl font-extrabold text-center mb-6 text-white drop-shadow-glow animate-bounce">
            ✨ เข้าสู่ระบบ ✨
          </h2>
          <form>
            <div className="mb-5">
              <label className="block text-[#fff] font-bold mb-2" htmlFor="email">
                 Email
              </label>
              <input
                type="text"
                id="email"
                className="border-2 border-white rounded-full w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="email"
                required
              />
            </div>
            <div className="mb-5">
              <label className="block text-[#fff] font-bold mb-2" htmlFor="password">
                 Password
              </label>
              <input
                type="password"
                id="password"
                className="border-2 border-white rounded-full w-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-pink-400"
                placeholder="password"
                required
              />
            </div>
            <button
              type="submit"
              className="bg-gradient-to-r from-[#f00784] to-pink-500 hover:from-pink-500 hover:to-[#f00784] text-white font-bold py-3 px-4 rounded-full w-full shadow-md transition-all duration-300"
            >
               Login 
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
