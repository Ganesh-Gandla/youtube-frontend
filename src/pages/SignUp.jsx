// src/pages/SignUp.jsx
import { useState } from "react";
import "../styles/SignUp.css";
import axios from "../utils/axios.js";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    const { firstName, lastName, email, password, confirmPassword } = formData;

    // Simple validation
    if (!firstName || !email || !password) {
      console.log(firstName, email, Password)
      return setErrorMsg("Please fill all required fields.");
    }

    if (password !== confirmPassword) {
      return setErrorMsg("Passwords do not match!");
    }

    setLoading(true);
    console.log({
      firstName,
      lastName,
      email,
      password,
    })

    try {
      const res = await axios.post("/auth/register", {
        firstName,
        lastName,
        email,
        password,
      });

      console.log("User registered:", res.data);

      alert("Account created successfully!");
      navigate("/login");
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response?.data?.message || "Registration failed. Try again."
      );
    }

    setLoading(false);
  };

  return (
    <div className="signup-page">
      <div className="signup-box">
        <img
          className="google-logo"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
        />

        <h1 className="signup-title">Create your Google Account</h1>
        <p className="signup-sub">Enter your details</p>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <form className="signup-form" onSubmit={handleSubmit}>
          {/* First / Last Name */}
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

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="full"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />

          {/* Password */}
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

          <p className="info">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </p>

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
