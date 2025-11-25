// src/components/Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Sidebar />
        <main className="content-area">
          {/* Add page content here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
