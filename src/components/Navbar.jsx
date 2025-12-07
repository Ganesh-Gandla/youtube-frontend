import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBars, FaSearch, FaMicrophone } from "react-icons/fa";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar({ toggleSidebar }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const userBtnRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const toggleUserMenu = () => setShowUserMenu((prev) => !prev);

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

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    setShowUserMenu(false);
    navigate("/login");
  };

  const handleYourChannel = () => {
  setShowUserMenu(false);

  if (!user?.channels || user.channels.length === 0) {
    alert("You don't have a channel yet. Please create one first.");
    navigate("/channel");  // open create channel page
    return;
  }

  // If user has a channel
  const channelId = user.channels[0]; // assuming 1 channel
  navigate(`/channel/${channelId}`);
};


  return (
    <nav className="navbar">
      {/* Left */}
      <div className="navbar-left">
        {/* <-- added onClick that calls toggleSidebar prop --> */}
        <button
          className="hamburger"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <FaBars />
        </button>

        <Link to="/" className="logo">
          <img src="/youtube.png" alt="YouTube" />
          <p>YouTube</p>
        </Link>
      </div>

      {/* Center */}
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn"><FaSearch /></button>
        <button className="voice-btn"><FaMicrophone /></button>
      </div>

      {/* Right */}
      <div className="navbar-right">
        {/* {user && <p className="nav-username">{user.username}</p>} */}

        {!user && (
          <Link to="/login">
            <button className="login-btn">Login</button>
          </Link>
        )}

        {user && (
          <>
          {/* on click need to redirect to add new video page */}
          {user.channels.length !== 0 && (<Link to="/addvideo"><button className="btn"> add +</button></Link>)}
            <div className="notification">
              <img src="/bell.png" alt="Notifications" />
            </div>

            <div className="user-menu-wrapper">
              <button className="user-icon-btn" ref={userBtnRef} onClick={toggleUserMenu}>
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="nav-avatar" />
                ) : (
                  <FaUserCircle />
                )}
              </button>

              {showUserMenu && (
                <div className="user-menu" ref={userMenuRef}>
                  <p className="user-name">{user.name || user.email}</p>
                  <div className="divider" />

                  <Link to="/channel">
                    <p className="user-menu-item">Create Channel</p>
                  </Link>

                  <p
                    className="user-menu-item"
                    onClick={handleYourChannel}
                  >
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
