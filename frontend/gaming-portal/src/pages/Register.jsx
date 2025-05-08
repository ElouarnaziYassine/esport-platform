import React from 'react';
import './Register.css';

function Register() {
  return (
    <div className="register-page">
      <div className="register-card">
        <h2>Create Account</h2>
        <p>Sign up to join the battle</p>
        <form>
          <input type="text" placeholder="Username" required />
          <input type="email" placeholder="Email" required />
          <input type="password" placeholder="Password" required />
          <input type="password" placeholder="Confirm Password" required />
          <button type="submit">SIGN UP</button>
        </form>
        <p className="login-cta">Already have an account? <a href="/login">Log In</a></p>
      </div>
    </div>
  );
}

export default Register;
