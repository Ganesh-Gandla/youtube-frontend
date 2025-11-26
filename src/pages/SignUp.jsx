// src/components/SignUp.jsx
import "../styles/SignUp.css";

function SignUp() {
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

        <form className="signup-form">

          {/* First / Last Name */}
          <div className="row">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
          </div>

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            className="full"
          />

          {/* Password */}
          <div className="row">
            <input type="password" placeholder="Password" />
            <input type="password" placeholder="Confirm password" />
          </div>

          <p className="info">
            Use 8 or more characters with a mix of letters, numbers & symbols.
          </p>

          <div className="action">
            <button className="btn-create">Create</button>
          </div>

        </form>
      </div>
    </div>
  );
}

export default SignUp;
