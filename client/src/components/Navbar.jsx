import { useState, useContext } from "react";
import logo from "../assets/logo_wo_bg.png";
import { useNavigate, Link } from "react-router-dom";
import { userContext } from "../Context/context";
import { logout } from "../api/userServices";
import { toast } from "react-toastify";

const Navbar = () => {
  const { isLogin, setIsLogin, setUser } = useContext(userContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      setIsLogin(false);
      setUser(null);
      toast.success("Logged Out Successfully");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Logout failed");
    } finally {
      setMenuOpen(false);
    }
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="w-full bg-gradient-to-r from-slate-900 to-slate-800 shadow-xl border-b border-slate-700 relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20">

          {/* Logo */}
          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 flex-shrink-0">
            <img src={logo} alt="Logo" className="w-10 h-10 sm:w-14 sm:h-14 object-contain" />
            <span className="text-2xl sm:text-3xl font-bold text-slate-100">BlogEcho</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-3">
            {isLogin ? (
              <>
                <button
                  onClick={() => navigate("/createpost")}
                  className="px-4 py-2 bg-slate-700 text-slate-300 hover:text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Write Blog
                </button>
                <button
                  onClick={() => navigate("/profile")}
                  className="px-4 py-2 bg-slate-700 text-slate-300 hover:text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-4 py-2 text-slate-300 hover:text-white font-medium transition-colors text-sm"
                >
                  Sign In
                </button>
                <button
                  onClick={() => navigate("/register")}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-sm"
                >
                  Sign Up
                </button>
              </>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 rounded-md text-slate-400 hover:text-slate-100 hover:bg-slate-700 transition-colors"
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-700 bg-slate-800 px-4 py-3 flex flex-col gap-2">
          {isLogin ? (
            <>
              <button
                onClick={() => { navigate("/createpost"); closeMenu(); }}
                className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg font-medium transition-colors"
              >
                ✍️ Write Blog
              </button>
              <button
                onClick={() => { navigate("/profile"); closeMenu(); }}
                className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg font-medium transition-colors"
              >
                👤 Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-3 text-red-400 hover:text-white hover:bg-red-600 rounded-lg font-medium transition-colors"
              >
                🚪 Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => { navigate("/login"); closeMenu(); }}
                className="w-full text-left px-4 py-3 text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg font-medium transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => { navigate("/register"); closeMenu(); }}
                className="w-full text-left px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Sign Up
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
