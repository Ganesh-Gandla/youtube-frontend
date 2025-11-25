// src/components/Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";
import Filterbar from "./Filterbar";
import VideoItem from "./VideoItem";
import VideoGrid from "./VideoGrid";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      
      <div className="main-content">
        <Sidebar />
        <main className="content-area">
          <Filterbar/>
          <hr />
          <VideoGrid/>
          {/* Add page content here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
