import React from "react";
import logo from "../assets/logo_wo_bg.png";

const Navbar = () => {
  return (
    <div className="flex justify-between items-center w-full px-20 py-6 bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl border-b border-slate-700">
      <div className="flex items-center gap-3 cursor-pointer">
        <img
          src={logo}
          alt="Logo"
          width={80}
          className="flex-shrink-0"
        />
        <div className="text-4xl font-bold text-slate-100 mt-8">BlogEcho</div>
      </div>
      <div className='flex items-center space-x-4'>
        <button className='px-6 py-2 text-lg text-slate-300 hover:text-white font-medium transition-colors duration-200'>
          Sign In
        </button>
        <button className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'>
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default Navbar;