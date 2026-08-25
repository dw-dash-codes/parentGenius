import { useState, useRef, useEffect } from "react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import Logo from "./ui/Logo";
import logoImg from "../assets/footer-img.png";
import { 
  FaGear, 
  FaUserPen, 
  FaCrown, 
  FaArrowRightFromBracket, 
  FaChevronRight,
  FaBars, 
  FaXmark 
} from "react-icons/fa6";
import profileImg from "../assets/profile_img.jpg";

export default function HomeNavbar() {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [user, setUser] = useState(null);

  const links = ["Home", "Courses", "Resources", "Therapy", "Community", "Challenges"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userId");
    sessionStorage.removeItem("token");
    
    setUser(null);
    setDropdownOpen(false);
    navigate("/login");
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        
        <div className="w-40 flex items-center shrink-0">
          <Logo width={160} src={logoImg} />
        </div>

        <nav className="hidden lg:flex items-center gap-12">
          {links.map((label) => (
            <NavLink
              key={label}
              to={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-medium text-white/90 transition-colors hover:text-accent-300 ${
                  isActive ? "text-white font-semibold" : ""
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center justify-end gap-3 sm:gap-4">
          
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-white/90 hover:text-white focus:outline-none transition-colors"
          >
            {mobileMenuOpen ? <FaXmark size={24} /> : <FaBars size={24} />}
          </button>

          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className={`flex items-center gap-2 cursor-pointer py-1 px-1.5 sm:px-2 rounded-full transition-all duration-150 focus:outline-none ${
                  dropdownOpen ? "bg-white/20 ring-2 ring-white/30" : "hover:bg-white/10 active:scale-95"
                }`}
              >
                <img
                  src={profileImg}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-white/50"
                />
                <span className="hidden sm:block text-sm font-medium text-white">
                  {user.username}
                </span>
                <span className={`text-white/80 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                  ▾
                </span>
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-ink-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                  <div className="p-4 flex items-center gap-3 border-b border-ink-100 bg-ink-50/40">
                    <img
                      src={profileImg}
                      alt={user.username}
                      className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-ink-200"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-sm text-ink-900 leading-snug truncate">
                        {user.username}
                      </p>
                      <p className="text-xs text-ink-500 truncate">
                        {user.email}
                      </p>
                    </div>
                  </div>

                  <div className="p-1.5 border-b border-ink-100 space-y-1">
                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/account");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold text-ink-900 transition-all duration-150 hover:bg-brand-50 hover:text-brand-600 active:scale-[0.98] group"
                    >
                      <span className="flex items-center gap-3">
                        <FaGear className="text-ink-500 text-base shrink-0 transition-colors group-hover:text-brand-600" />
                        Account
                      </span>
                      <FaChevronRight className="text-ink-400 text-xs shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                    </button>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/account/edit");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold text-ink-900 transition-all duration-150 hover:bg-brand-50 hover:text-brand-600 active:scale-[0.98] group"
                    >
                      <span className="flex items-center gap-3">
                        <FaUserPen className="text-ink-500 text-base shrink-0 transition-colors group-hover:text-brand-600" />
                        Edit Profile
                      </span>
                      <FaChevronRight className="text-ink-400 text-xs shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                    </button>

                    <button
                      onClick={() => {
                        setDropdownOpen(false);
                        navigate("/subscription");
                      }}
                      className="w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-left text-sm font-semibold text-ink-900 transition-all duration-150 hover:bg-brand-50 hover:text-brand-600 active:scale-[0.98] group"
                    >
                      <span className="flex items-center gap-3">
                        <FaCrown className="text-ink-500 text-base shrink-0 transition-colors group-hover:text-brand-600" />
                        Subscription
                      </span>
                      <FaChevronRight className="text-ink-400 text-xs shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:text-brand-500" />
                    </button>
                  </div>

                  <div className="p-1.5">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-bold text-red-500 transition-all duration-150 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] group"
                    >
                      <FaArrowRightFromBracket className="text-red-500 text-base shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="hidden sm:flex h-10 px-5 items-center rounded-full bg-white text-brand-500 text-sm font-medium transition-colors hover:bg-accent-500 hover:text-white"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="h-10 px-4 sm:px-5 flex items-center whitespace-nowrap rounded-full border border-white/50 text-white text-sm font-medium transition-colors hover:border-accent-400 hover:text-accent-300"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden absolute top-20 left-0 right-0 bg-white border-b border-ink-100 shadow-xl z-20 animate-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col px-4 py-4 space-y-1">
            {links.map((label) => (
              <NavLink
                key={label}
                to={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-brand-50 text-brand-500 font-semibold"
                      : "text-ink-700 hover:bg-ink-50 hover:text-brand-500"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            
            <div className="sm:hidden pt-4 mt-2 border-t border-ink-100">
              {user ? (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-center py-3 rounded-xl bg-red-50 text-red-500 text-sm font-bold transition-colors hover:bg-red-100"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block w-full text-center py-3 rounded-xl bg-brand-50 text-brand-500 text-sm font-bold transition-colors hover:bg-brand-100"
                >
                  Login to your account
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}