import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-4 text-lg font-bold">Control Panel</div>
      <nav>
        <ul className="p-2 flex flex-col gap-y-2">
          <li>
            <Link
              to="/dashboard"
              className={`block p-4  ${
                location.pathname === "/dashboard" ? "bg-gray-500" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`block p-4 ${
                location.pathname === "/settings" ? "bg-gray-500" : ""
              }`}
            >
              Settings
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
