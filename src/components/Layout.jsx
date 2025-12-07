// src/components/Layout.jsx
import { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <div className="app-container">
      <Navbar toggleSidebar={toggleSidebar} />

      <div className="main-content">
        <Sidebar sidebarOpen={sidebarOpen} />

        <main className={`content-area ${sidebarOpen ? "open" : "closed"}`}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
