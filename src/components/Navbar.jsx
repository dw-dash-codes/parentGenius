import { NavLink } from "react-router-dom";
import Logo from "./ui/Logo";


export default function Navbar() {
  const links = ["Home", "Courses", "Resources", "Therapy", "Community", "Challenges"];

  return (
    <header className="bg-white border-b border-ink-100">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

        <Logo height={15}/>

        <nav className="hidden lg:flex items-center gap-x-11">
          {links.map((label) => (
            <NavLink
              key={label}
              to={label === "Home" ? "/home" : `/${label.toLowerCase()}`}
              className={({ isActive }) =>
                `text-sm font-medium ${isActive ? "text-brand-500" : "text-ink-700 hover:text-brand-500"}`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-accent-500 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 34 34" fill="none">
              <path d="M17 6L31 12L17 18L3 12L17 6Z" fill="white" />
              <path d="M9 15V21C9 21 12 24 17 24C22 24 25 21 25 21V15L17 18L9 15Z" fill="white" opacity="0.75" />
            </svg>
          </div>
          <div className="flex items-center gap-2">
            <img
              src="https://placehold.co/40x40"
              alt="Lina"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-sm font-medium">Lina</span>
            <span className="text-ink-500">▾</span>
          </div>
        </div>

      </div>
    </header>
  );
}