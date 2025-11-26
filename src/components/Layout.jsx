// src/components/Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";
import Filterbar from "./Filterbar";
import VideoItem from "./VideoItem";
import VideoGrid from "./VideoGrid";
import Home from "../pages/Home.jsx"
import Channel from "../pages/Channel.jsx";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      
      <div className="main-content">
        <Sidebar />
        <main className="content-area">
          {/* <Home /> */}
          <Channel/>
          {/* Add page content here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
