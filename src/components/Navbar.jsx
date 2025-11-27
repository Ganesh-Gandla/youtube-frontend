import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBars, FaSearch, FaMicrophone } from "react-icons/fa";
import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const userBtnRef = useRef(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const toggleUserMenu = () => setShowUserMenu((s) => !s);

  // Close menu on outside click
  useEffect(() => {
    function handleClickOutside(e) {
      if (
        showUserMenu &&
        userMenuRef.current &&
        !userMenuRef.current.contains(e.target) &&
        userBtnRef.current &&
        !userBtnRef.current.contains(e.target)
      ) {
        setShowUserMenu(false);
      }
    }

    function handleEsc(e) {
      if (e.key === "Escape") setShowUserMenu(false);
    }

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

  return (
    <nav className="navbar">
      {/* Left: Logo */}
      <div className="navbar-left">
        <button className="hamburger" aria-label="Open menu">
          <FaBars />
        </button>

        <Link to="/">
          <div className="logo">
            <img src="/youtube.png" alt="YouTube Logo" />
            <p>YouTube</p>
          </div>
        </Link>
      </div>

      {/* Center: Search */}
      <div className="search-container">
        <input type="text" placeholder="Search" className="search-input" />
        <button className="search-btn">
          <FaSearch />
        </button>
        <button className="voiceSearch">
          <FaMicrophone />
        </button>
      </div>

      {/* Right: Auth Buttons */}
      <div className="navbar-right">

        {/* Show Login ONLY if user is not logged in */}
        {!user && (
          <>
            <Link to="/login">
              <button className="create-btn">Login</button>
            </Link>
          </>
        )}

        {/* Show User Menu ONLY if logged in */}
        {user && (
          <>
            <div className="notification">
              <img src="/bell.png" alt="Notifications" />
            </div>

            <div className="user-menu-wrapper">
              <button
                className="user-icon-btn"
                onClick={toggleUserMenu}
                ref={userBtnRef}
              >
                {user.avatar ? (
                  <img src={user.avatar} alt="User" className="nav-avatar" />
                ) : (
                  <FaUserCircle />
                )}
              </button>

              {showUserMenu && (
                <div className="user-menu" ref={userMenuRef}>
                  <p className="user-name">
                    {user.name || user.email}
                  </p>
                  <div className="user-menu-divider" />

                  <Link to="/channel/create">
                    <button className="user-menu-item">Create Channel</button>
                  </Link>

                  <Link to="/channel/1">
                    <button className="user-menu-item">Your Channel</button>
                  </Link>

                  <button className="user-menu-item">Settings</button>

                  <div className="user-menu-divider" />

                  <button className="user-menu-item signout" onClick={handleLogout}>
                    Sign out
                  </button>
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
