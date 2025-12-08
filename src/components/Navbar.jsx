import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBars, FaSearch, FaMicrophone } from "react-icons/fa";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar({ toggleSidebar }) {

  // ---------------- STATE ----------------
  const [showUserMenu, setShowUserMenu] = useState(false);  // Controls user dropdown menu
  const userMenuRef = useRef(null);                         // Reference to dropdown box
  const userBtnRef = useRef(null);                          // Reference to user avatar button

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get logged-in user from Redux store
  const { user } = useSelector((state) => state.auth);

  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

  // ---------------- CLOSE MENU ON OUTSIDE CLICK & ESC ----------------
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") setShowUserMenu(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [showUserMenu]);

  // ---------------- LOGOUT ----------------
  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setShowUserMenu(false);
    navigate("/login");
  };

  // ---------------- YOUR CHANNEL ----------------
  const handleYourChannel = () => {
    setShowUserMenu(false);

    // No channel? Redirect user to create one
    if (!user?.channels || user.channels.length === 0) {
      alert("You don't have a channel yet. Please create one first.");
      navigate("/channel");
      return;
    }

    // Redirect to user's channel page
    const channelId = user.channels[0];
    navigate(`/channel/${channelId}`);
  };

  // ---------------- SEARCH ----------------
  const [searchText, setSearchText] = useState("");

  const handleSearch = () => {
    if (!searchText.trim()) return;
    navigate(`/?q=${searchText}`);
  };

  return (
    <nav className="navbar">

      {/* ---------------- LEFT SECTION ---------------- */}
      <div className="navbar-left">

        {/* Sidebar toggle button */}
        <button
          className="hamburger"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        {/* Logo */}
        <Link to="/" className="logo">
          <img src="/youtube.png" alt="YouTube" />
          <p className="logo-text">YouTube</p>
        </Link>
      </div>

      {/* ---------------- CENTER (Search Bar) ---------------- */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          onChange={e => setSearchText(e.target.value)}
        />
        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
        <button className="voice-btn">
          <FaMicrophone />
        </button>
      </div>

      {/* ---------------- RIGHT SECTION ---------------- */}
      <div className="navbar-right">

        {/* If user NOT logged in — show login button */}
        {!user && (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}

        {/* If user logged in — show user features */}
        {user && (
          <>

            {/* Add Video Button (only if user has a channel) */}
            {user.channels.length !== 0 && (
              <Link to="/addvideo">
                <button className="btn"> + <span className="btn-text">Add</span></button>
              </Link>
            )}

            {/* Notification Icon */}
            <div className="notification">
              <img src="/bell.png" alt="Notifications" />
            </div>

            {/* User Avatar + Dropdown Menu */}
            <div className="user-menu-wrapper">
              <button
                className="user-icon-btn"
                ref={userBtnRef}
                onClick={toggleUserMenu}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="nav-avatar" />
                ) : (
                  <FaUserCircle className="nav-avatar" />
                )}
              </button>

              {/* Dropdown Menu */}
              {showUserMenu && (
                <div className="user-menu" ref={userMenuRef}>
                  
                  <p className="user-name">
                    {user.username || user.email}
                  </p>
                  <div className="divider" />

                  <Link to="/channel">
                    <p className="user-menu-item">Create Channel</p>
                  </Link>

                  <p className="user-menu-item" onClick={handleYourChannel}>
                    Your Channel
                  </p>

                  <p className="user-menu-item">Settings</p>

                  <div className="divider" />

                  <p className="user-menu-item logout-btn" onClick={handleLogout}>
                    Sign out
                  </p>

                </div>
              )}

            </div>

          </>
        )}
      </div>

    </nav>
  );
}

export default Navbar;
