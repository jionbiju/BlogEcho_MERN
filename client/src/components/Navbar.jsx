import React from "react";
import logo from "../assets/logo_wo_bg.png";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { userContext } from "../Context/context";
import { logout } from "../api/userServices";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLogin, setIsLogin } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout(); 
      setIsLogin(false);
      toast.success("Logged Out Successfully");
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="flex justify-between items-center w-full px-20 py-6 bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl border-b border-slate-700">
      <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
        <img
          src={logo}
          alt="Logo"
          width={80}
          className="flex-shrink-0"
        />
        <div className="text-4xl font-bold text-slate-100 mt-8">BlogEcho</div>
      </div>
      
      <div className='flex items-center space-x-4'>
        {isLogin ? (
          <>
            <button 
              onClick={() => navigate('/createpost')} 
              className='px-6 py-2 bg-slate-700 cursor-pointer  text-slate-300 hover:text-white font-medium rounded-lg transition-colors duration-200'
            >
              Write Blog
            </button>
            <button 
              onClick={() => navigate('/profile')} 
              className='px-6 py-2 text-lg  bg-slate-700 rounded-lg cursor-pointer text-slate-300 hover:text-white font-medium transition-colors duration-200'
            >
              Profile
            </button>
            <button 
              onClick={handleLogout} 
              className='px-6 py-2 bg-red-600 hover:bg-red-700 cursor-pointer text-white font-medium rounded-lg transition-colors duration-200'
            >
              Logout
            </button>
          </>
        ) : (
  
          <>
            <button 
              onClick={() => navigate('/login')} 
              className='px-6 py-2 text-lg text-slate-300 hover:text-white font-medium transition-colors duration-200'
            >
              Sign In
            </button>
            <button 
              onClick={() => navigate('/register')} 
              className='px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200'
            >
              Sign Up
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;