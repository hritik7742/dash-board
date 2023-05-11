// Signup.js

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../App.css';


function Signup() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function submit(e) {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/signup', {
        email,
        password,
      });

      navigate('/dashboard', { state: { id: email } });
    } catch (e) {
      setError('Error occurred');
      console.log(e);
    }
  }

  return (
    <div className="auth-container">
      <h1>Signup</h1>
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
        <input className="auth-button" type="submit" value="Signup" />
      </form>
      <p>OR</p>
      <Link className="auth-link" to="/">
        Login
      </Link>
      {error && <p className="auth-error">{error}</p>}
    </div>
  );
}

export default Signup;
