// Login.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function submit(e) {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:8000/', {
        email,
        password,
      });
  
      const data = response.data;
      if (data === 'exist') {
        navigate('/dashboard', { state: { id: email } });
      } else if (data === 'notexist') {
        window.alert('User has not signed up');
      } else if (data === 'wrong password') {
        window.alert('Wrong password');
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="auth-container">
      <h1>Login</h1>
      <form className="auth-form" onSubmit={submit}>
        <input
          className="auth-input"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          className="auth-input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input className="auth-button" type="submit" value="Login" />
      </form>
      <p>OR</p>
      <Link className="auth-link" to="/signup">
        Signup
      </Link>
    </div>
  );
}

export default Login;
