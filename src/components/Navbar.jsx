import { useState, useRef, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "./ui/Logo";
import { 
  FaGear, 
  FaUserPen, 
  FaCrown, 
  FaArrowRightFromBracket, 
  FaChevronRight 
} from "react-icons/fa6";

export default function Navbar() {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const links = ["Home", "Courses", "Resources", "Therapy", "Community", "Challenges"];

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white border-b border-ink-100 absolute top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        {/* Fixed left container width to prevent logo shift */}
        <div className="w-40 flex items-center">
          <Logo width={160} />
        </div>

        {/* Standardized fixed gap-12 for zero shift */}
        <nav className="hidden lg:flex items-center gap-12">
          {links.map((label) => (
            <NavLink
              key={label}
              to={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors ${
                  isActive ? "text-brand-500 font-semibold" : "text-ink-700 hover:text-brand-500"
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Fixed right container with exact matching gap-3 */}
        <div className="flex items-center justify-end gap-3">
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center shrink-0 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 34 34" fill="none">
              <path d="M17 6L31 12L17 18L3 12L17 6Z" fill="white" />
              <path d="M9 15V21C9 21 12 24 17 24C22 24 25 21 25 21V15L17 18L9 15Z" fill="white" opacity="0.75" />
            </svg>
          </div>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className={`flex items-center gap-2 cursor-pointer py-1 px-2 rounded-full transition-all duration-150 focus:outline-none ${
                dropdownOpen ? "bg-brand-50 ring-2 ring-brand-100" : "hover:bg-ink-50 active:scale-95"
              }`}
            >
              <img
                src="https://placehold.co/36x36"
                alt="Lina"
                className="w-8 h-8 rounded-full object-cover shrink-0 ring-1 ring-ink-100"
              />
              <span className="text-sm font-medium text-ink-900">Lina</span>
              <span className={`text-ink-500 text-xs transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`}>
                ▾
              </span>
            </button>

            {dropdownOpen && (
              <div className="absolute right-0 top-14 w-64 bg-white rounded-2xl shadow-xl ring-1 ring-ink-100 overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-150">
                <div className="p-4 flex items-center gap-3 border-b border-ink-100 bg-ink-50/40">
                  <img
                    src="https://placehold.co/44x44"
                    alt="Lina"
                    className="w-11 h-11 rounded-xl object-cover shrink-0 ring-1 ring-ink-200"
                  />
                  <div className="min-w-0">
                    <p className="font-bold text-sm text-ink-900 leading-snug">Lina</p>
                    <p className="text-xs text-ink-500 truncate">Lina@gmail.com</p>
                  </div>
                </div>

                <div className="p-1.5 border-b border-ink-100 space-y-1">
                  {/* Account / Settings Button */}
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

                  {/* Edit Profile Button */}
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

                  {/* Subscription Button */}
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
                    onClick={() => {
                      setDropdownOpen(false);
                      navigate("/login");
                    }}
                    className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-left text-sm font-bold text-red-500 transition-all duration-150 hover:bg-red-50 hover:text-red-600 active:scale-[0.98] group"
                  >
                    <FaArrowRightFromBracket className="text-red-500 text-base shrink-0 transition-transform duration-150 group-hover:-translate-x-0.5" />
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </header>
  );
}