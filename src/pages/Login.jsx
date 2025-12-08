// Import required hooks and dependencies
import { useState } from "react";
import "../styles/Login.css";
import axios from "../utils/axios.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Form state for email & password
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  // Loading state for button animation
  const [loading, setLoading] = useState(false);

  // Store error message for display
  const [errorMsg, setErrorMsg] = useState("");

  // Handle input updates
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Process login form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { email, password } = formData;

    // Simple front-end validation
    if (!email || !password) {
      return setErrorMsg("Please fill all fields.");
    }

    setLoading(true);

    try {
      // Make login request
      const res = await axios.post("/auth/login", { email, password });

      const userData = res.data;

      // Store token & user in localStorage
      localStorage.setItem("token", userData.token);
      localStorage.setItem("user", JSON.stringify(userData.user));

      // Update Redux auth state
      dispatch(loginSuccess({ user: userData.user, token: userData.token }));

      // Redirect to home page
      navigate("/");
    } catch (error) {
      console.log(error);

      // Show backend error or default message
      setErrorMsg(
        error.response?.data?.message || "Invalid login credentials."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">

        {/* Google logo for UI consistency */}
        <img
          className="google-logo"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
        />

        {/* Heading */}
        <h1 className="login-title">Sign in</h1>
        <p className="login-sub">Use your Google Account</p>

        {/* Display login error */}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        {/* Login form */}
        <form className="login-form" onSubmit={handleSubmit}>

          {/* Email Input */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password Input */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          {/* Login button */}
          <div className="action">
            <button className="btn-login" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        {/* Navigate to Signup */}
        <p className="create-account">
          <a href="/signup">Create account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
