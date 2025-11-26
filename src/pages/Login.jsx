// src/components/Login.jsx
import "../styles/Login.css";

function Login() {
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

        <form className="login-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />

          <div className="action">
            <button className="btn-login">Login</button>
          </div>
        </form>

      </div>
    </div>
  );
}

export default Login;
