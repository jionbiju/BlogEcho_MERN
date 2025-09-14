// import React from "react";
// import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
// import { BiCopyright } from "react-icons/bi";
// import logo from "../assets/logo_wo_bg.png";

// const Footer = () => {
//   return (
//     <div className="w-full bg-slate-800 min-h-[120px] flex items-center justify-between px-6 md:px-10 py-4 border-t border-slate-700">
//       {/* Left*/}
//       <div className="flex gap-3 items-center">
//         <img
//           className="w-12 h-12 object-contain"
//           src={logo}
//           alt="BlogEcho Logo"
//         />
//         <div className="text-2xl mt-5 font-bold text-slate-100 font-['Outfit']">
//           BlogEcho
//         </div>
//       </div>

//       {/* Center */}
//       <div className="flex items-center justify-center text-slate-400 text-md py-4 space-y-1">
//         <div className="flex items-center space-x-1">
//           <BiCopyright className="w-4 h-4" />
//           <span>
//             {new Date().getFullYear()} Jion Biju. All rights reserved.
//           </span>
//         </div>
//       </div>

//       {/* Right*/}
//       <div className="flex gap-4 items-center">
//         <a
//           href="https://www.linkedin.com/in/jion-biju-738072283"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-slate-400 hover:text-blue-400 transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-full"
//           aria-label="LinkedIn"
//         >
//           <FaLinkedin size={20} />
//         </a>
//         <a
//           href="https://www.instagram.com/jion__17"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-slate-400 hover:text-pink-400 transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-full"
//           aria-label="Instagram"
//         >
//           <FaInstagram size={20} />
//         </a>
//         <a
//           href="https://github.com/jionbiju"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-slate-400 hover:text-slate-200 transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-full"
//           aria-label="GitHub"
//         >
//           <FaGithub size={20} />
//         </a>
//       </div>
//     </div>
//   );
// };

// export default Footer;
import React from "react";
import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa";
import { BiCopyright } from "react-icons/bi";
import logo from "../assets/logo_wo_bg.png";

const Footer = () => {
  return (
    <div className="w-full sm:w-full bg-slate-800 flex flex-col md:flex-row items-center md:justify-between  px-6 md:px-10 py-6 border-t border-slate-700 gap-4">
      {/* Left */}
      <div className="flex gap-3 items-center">
        <img
          className="w-12 h-12 object-contain"
          src={logo}
          alt="BlogEcho Logo"
        />
        <div className="text-2xl font-bold text-slate-100 font-['Outfit']">
          BlogEcho
        </div>
      </div>

      {/* Center */}
      <div className="flex items-center justify-center text-slate-400 text-sm text-center">
        <BiCopyright className="w-4 h-4 mr-1" />
        <span>
          {new Date().getFullYear()} Jion Biju. All rights reserved.
        </span>
      </div>

      {/* Right */}
      <div className="flex gap-4 items-center">
        <a
          href="https://www.linkedin.com/in/jion-biju-738072283"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-blue-400 transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-full"
          aria-label="LinkedIn"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://www.instagram.com/jion__17"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-pink-400 transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-full"
          aria-label="Instagram"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://github.com/jionbiju"
          target="_blank"
          rel="noopener noreferrer"
          className="text-slate-400 hover:text-slate-200 transition-colors duration-200 p-2 hover:bg-slate-800/50 rounded-full"
          aria-label="GitHub"
        >
          <FaGithub size={20} />
        </a>
      </div>
    </div>
  );
};

export default Footer;
