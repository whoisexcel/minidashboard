import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 h-screen bg-gray-800 text-white fixed left-0 top-0">
      <div className="p-4 text-lg font-bold">Admin Panel</div>
      <nav>
        <ul>
          <li>
            <Link
              to="/dashboard"
              className={`block p-4 hover:bg-gray-700 ${
                location.pathname === "/dashboard" ? "bg-gray-700" : ""
              }`}
            >
              Dashboard
            </Link>
          </li>
          <li>
            <Link
              to="/users"
              className={`block p-4 hover:bg-gray-700 ${
                location.pathname === "/users" ? "bg-gray-700" : ""
              }`}
            >
              Users
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className={`block p-4 hover:bg-gray-700 ${
                location.pathname === "/settings" ? "bg-gray-700" : ""
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
