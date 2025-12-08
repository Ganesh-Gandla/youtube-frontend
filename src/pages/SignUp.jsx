// src/pages/SignUp.jsx

// Import required dependencies and hooks
import { useState } from "react";
import "../styles/SignUp.css";
import axios from "../utils/axios.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  // State to store all input values
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    avatar: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Loading button animation
  const [loading, setLoading] = useState(false);

  // Display error message
  const [errorMsg, setErrorMsg] = useState("");

  // Update form data on each input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Submit registration form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { firstName, lastName, avatar, email, password, confirmPassword } =
      formData;

    // Simple validation for required fields
    if (!firstName.trim())
      return setErrorMsg("First name is required.");

    if (!email.trim())
      return setErrorMsg("Email is required.");

    // Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email))
      return setErrorMsg("Enter a valid email address.");

    // Password strength rule
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (!passwordRegex.test(password)) {
      return setErrorMsg(
        "Password must be 8+ characters with uppercase, lowercase, number & symbol."
      );
    }

    // Check password match
    if (password !== confirmPassword)
      return setErrorMsg("Passwords do not match!");

    setLoading(true);

    try {
      // Send data to backend API
      const res = await axios.post("/auth/register", {
        firstName,
        lastName,
        avatar,
        email,
        password,
      });

      // Success message
      alert("Account created successfully!");
      navigate("/login");

    } catch (error) {
      // Show backend error or fallback message
      setErrorMsg(
        error.response?.data?.message ||
        "Registration failed. Try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">

        {/* Google style logo */}
        <img
          className="google-logo"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
        />

        {/* Heading */}
        <h1 className="signup-title">Create your Google Account</h1>
        <p className="signup-sub">Enter your details</p>

        {/* Error message block */}
        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        {/* Registration Form */}
        <form className="signup-form" onSubmit={handleSubmit}>

          {/* First name & Last name */}
          <div className="row">
            <input
              type="text"
              placeholder="First name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />

            <input
              type="text"
              placeholder="Last name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>

          {/* Avatar URL */}
          <input
            type="text"
            placeholder="Profile avatar"
            name="avatar"
            value={formData.avatar}
            onChange={handleChange}
          />

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password + Confirm Password */}
          <div className="row">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />

            <input
              type="password"
              placeholder="Confirm password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
          </div>

          {/* Password instructions */}
          <p className="info">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </p>

          {/* Submit Button */}
          <div className="action">
            <button className="btn-create" disabled={loading}>
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
