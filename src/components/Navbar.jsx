import { useState, useRef, useEffect } from "react";
import { FaUserCircle, FaBars, FaSearch, FaMicrophone } from "react-icons/fa";
import "../styles/Navbar.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { increment, decrement, reset } from "../redux/counterSlice";

function Navbar() {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const userMenuRef = useRef(null);
  const userBtnRef = useRef(null);

  const value = useSelector((state)=>state.counter.value)
  const dispatch = useDispatch();

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


  const handleYourChannel = () => {
    setShowUserMenu(false);
    console.log("Your channel clicked");
    // TODO: navigate('/my-channel') or open channel editor
  };

  const handleSignOut = () => {
    setShowUserMenu(false);
    console.log("Sign out clicked");
    // TODO: perform sign out (call API, clear tokens, redirect)
  };

  return (
    <nav className="navbar">
      {/* Left section: Hamburger + Logo */}
      <div className="navbar-left">
        <button className="hamburger" aria-label="Open menu">
          <FaBars />
        </button>
        <Link to="/"><div className="logo" role="img" aria-label="YouTube Logo">
          <img src="./youtube.png" alt="YouTube Logo" />
          <p>YouTube - {value}</p>
        </div></Link>
      </div>

      {/* Center: Search bar */}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search"
          className="search-input"
          aria-label="Search"
        />
        <button className="search-btn" aria-label="Search">
          <FaSearch />
        </button>
        <button className="voiceSearch" aria-label="Search by voice">
          <FaMicrophone />
        </button>
      </div>

      {/* Right section: User buttons */}
      <div className="navbar-right">
        <Link to="/login"><button className="create-btn" aria-label="Create">
          login
        </button></Link>

        <button className="create-btn" aria-label="Create" onClick={()=>dispatch(increment())}>
          + Create
        </button>

        <div className="notification" aria-hidden="true">
          <img src="./bell.png" alt="Notifications" />
        </div>

        {/* USER ICON + MENU */}
        <div className="user-menu-wrapper">
          <button
            className="user-icon-btn"
            onClick={toggleUserMenu}
            aria-haspopup="true"
            aria-expanded={showUserMenu}
            aria-label="User menu"
            ref={userBtnRef}
          >
            <FaUserCircle />
          </button>

          {showUserMenu && (
            <div
              className="user-menu"
              ref={userMenuRef}
              role="menu"
              aria-label="User options"
            >
              <Link to="/channel/create"><button
                className="user-menu-item"
                role="menuitem"
              >
                Create Channel
              </button></Link>

              <Link to="/channel/1"><button
                className="user-menu-item"
                onClick={handleYourChannel}
                role="menuitem"
              >
                Your Channel
              </button></Link>



              <button
                className="user-menu-item"
                role="menuitem"
              >
                Settings
              </button>
              <div className="user-menu-divider" />
              <button
                className="user-menu-item signout"
                onClick={handleSignOut}
                role="menuitem"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
