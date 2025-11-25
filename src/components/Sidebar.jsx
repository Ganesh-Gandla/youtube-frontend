// src/components/Sidebar.jsx
import { FaHome, FaFire, FaList } from "react-icons/fa";
import "../styles//Sidebar.css";

function Sidebar() {
  return (
    <aside className="sidebar">
      <ul>
        <li><FaHome /> <span>Home</span></li>
        <li><FaFire /> <span>Trending</span></li>
        <li><FaList /> <span>Subscriptions</span></li>
      </ul>
    </aside>
  );
}

export default Sidebar;
