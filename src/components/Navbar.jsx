// src/components/Navbar.jsx
import { FaUserCircle, FaBars, FaSearch, FaMicrophone } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      {/* Left section: Hamburger + Logo */}
      <div className="navbar-left">
        <button className="hamburger">
          <FaBars />
        </button>
        <div className="logo">
          <img src="./youtube.png" alt="YouTube Logo" />
          <p>YouTube</p>
        </div>
      </div>

      {/* Center: Search bar */}
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">
          <FaSearch />
        </button>
        <button className="voiceSearch">
          <FaMicrophone />
        </button>
      </div>

      {/* Right section: User buttons */}
      <div className="navbar-right">
        <button className="create-btn">+ Create</button>
        <div className="notification">
          <img src="./bell.png" alt="Notifications" />
        </div>
        <div className="user-icon">
          <FaUserCircle />
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
