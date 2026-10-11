// dashboard/DashboardLayout.jsx
// Sidebar on the left, the current dashboard page on the right.

import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutGrid, Settings, Palette, FileText, Inbox, ExternalLink, LogOut, Menu } from "lucide-react";
import { useSettings } from "../context/SettingsContext";

const menu = [
  { path: "/dashboard", label: "Overview", icon: LayoutGrid },
  { path: "/dashboard/settings", label: "Site settings", icon: Settings },
  { path: "/dashboard/colors", label: "Colors", icon: Palette },
  { path: "/dashboard/blogs", label: "Blog posts", icon: FileText },
  { path: "/dashboard/messages", label: "Messages", icon: Inbox }
];

function DashboardLayout() {
  const { settings } = useSettings();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function logout() {
    localStorage.removeItem("adminToken");
    navigate("/dashboard/login");
  }

  return (
    <div className="dash">
      <aside className={sidebarOpen ? "dash-sidebar open" : "dash-sidebar"}>
        <div className="dash-brand">
          {settings.logo && <img src={settings.logo} alt="" />}
          <span>{settings.siteName}</span>
        </div>

        <nav className="dash-menu">
          {menu.map(function (item) {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/dashboard"}
                onClick={function () { setSidebarOpen(false); }}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="dash-menu dash-menu-bottom">
          <a href="/" target="_blank" rel="noreferrer">
            <ExternalLink size={18} />
            View website
          </a>

          <button type="button" onClick={logout}>
            <LogOut size={18} />
            Log out
          </button>
        </div>
      </aside>

      <div className="dash-main">
        <button
          type="button"
          className="dash-mobile-toggle"
          onClick={function () { setSidebarOpen(!sidebarOpen); }}
        >
          <Menu size={20} /> Menu
        </button>

        <Outlet />
      </div>
    </div>
  );
}

export default DashboardLayout;
