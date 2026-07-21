import { NavLink, Link } from "react-router-dom";
import Logo from "./ui/Logo";
import logoImg from "../assets/footer-img.png"

export default function HomeNavbar() {
  const links = ["Home", "Courses", "Resources", "Therapy", "Community", "Challenges"];

  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo width={160} src={logoImg}/>

        <nav className="hidden lg:flex items-center gap-13">
          {links.map((label) => (
            <NavLink
              key={label}
              to={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-medium text-white/90 transition-colors hover:text-accent-300 ${isActive ? "text-white" : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent-500 flex items-center justify-center">
            <svg width="16" height="16" viewBox="0 0 34 34" fill="none">
              <path d="M17 6L31 12L17 18L3 12L17 6Z" fill="white" />
              <path d="M9 15V21C9 21 12 24 17 24C22 24 25 21 25 21V15L17 18L9 15Z" fill="white" opacity="0.75" />
            </svg>
          </div>
          <Link to="/login" className="h-9 px-5 flex items-center rounded-full bg-white text-brand-500 text-sm font-medium transition-colors hover:bg-accent-500 hover:text-white">Login</Link>
          <Link to="/register" className="h-9 px-5 flex items-center rounded-full border border-white/50 text-white text-sm font-medium transition-colors hover:border-accent-400 hover:text-accent-300">Sign Up</Link>
        </div>
      </div>
    </header>
  );
}