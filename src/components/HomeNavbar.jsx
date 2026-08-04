import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "./ui/Logo";
import logoImg from "../assets/footer-img.png";
import { FaBars, FaXmark } from "react-icons/fa6";

export default function HomeNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const links = ["Home", "Courses", "Resources", "Therapy", "Community", "Challenges"];

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

          {/* <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center shrink-0 shadow-sm">
            <svg width="18" height="18" viewBox="0 0 34 34" fill="none">
              <path d="M17 6L31 12L17 18L3 12L17 6Z" fill="white" />
              <path d="M9 15V21C9 21 12 24 17 24C22 24 25 21 25 21V15L17 18L9 15Z" fill="white" opacity="0.75" />
            </svg>
          </div> */}
          
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
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full text-center py-3 rounded-xl bg-brand-50 text-brand-500 text-sm font-bold transition-colors hover:bg-brand-100"
              >
                Login to your account
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}