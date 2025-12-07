import { FaHome, FaList, FaFire, FaUserCircle, FaDownload } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../styles/Sidebar.css";

function Sidebar({ sidebarOpen = true }) {
  return (
    <aside className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
      
      {sidebarOpen ? (
        <ul className="sidebar-list">

          <li><Link to="/"><FaHome /> <span>Home</span></Link></li>
          <li><FaFire /> <span>Shorts</span></li>
          <li><FaList /> <span>Subscriptions</span></li>

          <hr />

          <li><span className="section-title">You</span></li>
          <li><span>History</span></li>
          <li><span>Playlist</span></li>
          <li><span>Your videos</span></li>
          <li><span>Your courses</span></li>
          <li><span>Watch later</span></li>
          <li><span>Liked videos</span></li>
          <li><span>Downloads</span></li>
          <li><span>Your clips</span></li>

          <hr />

          <li><span>Shopping</span></li>
          <li><span>Music</span></li>
          <li><span>Movies</span></li>
          <li><span>Live</span></li>
          <li><span>Gaming</span></li>
          <li><span>News</span></li>
          <li><span>Sports</span></li>
          <li><span>Courses</span></li>
          <li><span>Fashion & Beauty</span></li>
          <li><span>Podcasts</span></li>

          <hr />

          <li><span>YouTube Premium</span></li>
          <li><span>YouTube Studio</span></li>
          <li><span>YouTube Music</span></li>
          <li><span>YouTube Kids</span></li>

          <hr />

          <li><span>Settings</span></li>
          <li><span>Report history</span></li>
          <li><span>Help</span></li>
          <li><span>Send feedback</span></li>
          <li><span>Trending</span></li>

        </ul>
      ) : (
        <ul className="sidebar-list small">
          <li><Link to="/"><FaHome /></Link></li>
          <li><FaFire /></li>
          <li><FaList /></li>
          <li><FaUserCircle /></li>
          <li><FaDownload /></li>
        </ul>
      )}

    </aside>
  );
}

export default Sidebar;
