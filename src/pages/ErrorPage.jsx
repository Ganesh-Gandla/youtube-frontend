// src/pages/ErrorPage.jsx
import { Link } from "react-router-dom";
import "../styles/ErrorPage.css";

function ErrorPage() {
  return (
    <div className="error-page">
      <div className="error-box">
        <h1 className="error-code">404</h1>
        <p className="error-msg">This page isn't available</p>
        <p className="error-sub">
          The page you are looking for may have been removed or doesn't exist.
        </p>

        <Link to="/" className="home-btn"> 
          Go to Home
        </Link>
      </div>
    </div>
  );
}

export default ErrorPage;
