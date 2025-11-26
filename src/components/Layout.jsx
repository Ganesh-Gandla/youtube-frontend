// src/components/Layout.jsx
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "../styles/Layout.css";
import Filterbar from "./Filterbar";
import VideoItem from "./VideoItem";
import VideoGrid from "./VideoGrid";
import Home from "../pages/Home.jsx"
import ChannelPage from "../pages/ChannelPage.jsx";
import VideoPage from "../pages/VideoPage.jsx";
import CreateChannelPage from "../pages/CreateChannelPage.jsx";

function Layout() {
  return (
    <div className="app-container">
      <Navbar />
      
      <div className="main-content">
        <Sidebar />
        <main className="content-area">
          {/* <Home /> */}
          {/* <ChannelPage/> */}
          {/* <VideoPage/> */}
          <CreateChannelPage/>
          {/* Add page content here */}
        </main>
      </div>
    </div>
  );
}

export default Layout;
