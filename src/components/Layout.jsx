// src/components/Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import "../styles/Layout.css";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        {/* <Sidebar /> */}
        <main className="content-area">
          <Outlet/>
        </main>
      </div>
    </div>
  );
}

export default Layout;
