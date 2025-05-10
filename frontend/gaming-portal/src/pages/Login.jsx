import React, { useState } from 'react';
import './Login.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Fixed import statement

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    const loginData = {
      username: username,
      password: password,
    };

    try {
      // Make the login request
      const response = await axios.post('http://localhost:8080/api/auth/login', loginData);
      console.log('Login response:', response.data);

      // Check if token exists in the response
      const token = response.data.token;
      if (!token) {
        console.error('No token received in response');
        setError('Authentication failed: No token received');
        return;
      }

      // Store the token
      localStorage.setItem('token', token);

      // ——— NEW: ADMIN‑REDIRECT LOGIC ———
      // First, see if the backend included a role in its response
      const backendRole = response.data.role;
      if (backendRole && ['admin','ADMIN','ROLE_ADMIN'].includes(backendRole)) {
        console.log('Backend says admin → redirecting');
        window.location.href = '/admin/dashboard';
        return;
      }

      // Otherwise decode the JWT and inspect its payload
      const decodedToken = jwtDecode(token);
      console.log('Decoded token:', decodedToken);

      // Determine role from various possible fields
      let role = decodedToken.role
              || (Array.isArray(decodedToken.roles) ? decodedToken.roles[0] : decodedToken.roles)
              || (decodedToken.authorities && (
                   Array.isArray(decodedToken.authorities)
                     ? decodedToken.authorities.find(a => typeof a === 'string')
                     : decodedToken.authorities.authority
                 ))
              || decodedToken.sub; // fallback

      console.log('Detected role:', role);

      // Redirect based on the detected role
      if (['admin','ADMIN','ROLE_ADMIN'].includes(role)) {
        console.log('Token says admin → redirecting');
        window.location.href = '/admin/dashboard';
      } else {
        console.log('Redirecting to home page');
        window.location.href = '/home';
      }
      // ————————————————————————————

    } catch (err) {
      console.error('Login error:', err);
      if (err.response) {
        if (err.response.status === 401) setError('Invalid username or password');
        else setError(`Server error: ${err.response.status}`);
      } else if (err.request) {
        setError('No response from server. Please check your connection.');
      } else {
        setError(`Error: ${err.message}`);
      }
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Welcome Back</h2>
        <p>Login to your account</p>
        {error && <p className="error">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">SIGN IN</button>
        </form>
        <p className="signup-cta">
          Don't have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
