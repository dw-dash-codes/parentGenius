import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { FaBookOpen, FaUsers, FaArrowRightFromBracket, FaHouse } from "react-icons/fa6";
import logo from "../../assets/admin-logo.png"; 

const NAV_ITEMS = [
  { path: "/admin/courses", label: "Manage Courses", icon: FaBookOpen },
  { path: "/admin/users", label: "Registered Users", icon: FaUsers },
];

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-ink-900 text-white flex flex-col justify-between p-6 shrink-0 fixed inset-y-0 left-0 z-30">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            {/* Custom "P" ki jagah Actual Logo */}
            <img src={logo} alt="ParentGenius Logo" className="w-8 h-8 object-contain" />
            <div>
              <h2 className="font-bold text-base leading-tight">ParentGenius</h2>
              <span className="text-xs text-brand-500 font-medium">Admin Panel</span>
            </div>
          </div>

          <nav className="space-y-1.5">
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-full text-sm font-medium transition-colors ${
                      isActive
                        ? "bg-brand-500 text-white"
                        : "text-ink-400 hover:text-white hover:bg-ink-800"
                    }`
                  }
                >
                  <Icon size={16} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-ink-800 space-y-2">
          <button
            onClick={() => navigate("/")}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-medium text-ink-300 hover:text-white hover:bg-ink-800 transition-colors cursor-pointer"
          >
            <FaHouse size={13} /> Back to Website
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-full text-xs font-medium text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors cursor-pointer"
          >
            <FaArrowRightFromBracket size={13} /> Log Out
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 ml-64 flex flex-col min-h-screen">
        <header className="h-16 border-b border-ink-100 px-8 flex items-center justify-between sticky top-0 bg-white z-20">
          <h1 className="text-lg font-bold text-ink-900">Admin Dashboard</h1>
        </header>

        <main className="p-8 flex-1 max-w-6xl w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
}