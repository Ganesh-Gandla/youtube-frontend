// src/pages/Login.jsx
import { useState } from "react";
import "../styles/Login.css";
import axios from "../utils/axios.js";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice";
import { useNavigate } from "react-router-dom"; 

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
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

    const { email, password } = formData;

    if (!email || !password) {
      return setErrorMsg("Please fill all fields.");
    }

    setLoading(true);

    try {
      const res = await axios.post("/auth/login", { email, password });

      const userData = res.data;

      // Store token locally
      localStorage.setItem("token", userData.token);

      // Update Redux state
      dispatch(loginSuccess(userData.user));

      navigate("/");
    } catch (error) {
      console.log(error);
      setErrorMsg(
        error.response?.data?.message || "Invalid login credentials."
      );
    }

    setLoading(false);
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <img
          className="google-logo"
          src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
          alt="Google"
        />

        <h1 className="login-title">Sign in</h1>
        <p className="login-sub">Use your Google Account</p>

        {errorMsg && <p className="error-msg">{errorMsg}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
          />

          <div className="action">
            <button className="btn-login" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>

        <p className="create-account">
          <a href="/signup">Create account</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
