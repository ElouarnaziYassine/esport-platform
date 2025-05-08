import React from 'react';
import './Login.css';

function Login() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        <form>
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <button type="submit">SIGN IN</button>
        </form>
        <p className="signup-cta">Don't have an account? <a href="/register">Sign Up</a></p>
      </div>
    </div>
  );
}

export default Login;
