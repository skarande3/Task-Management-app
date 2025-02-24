import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setMessage('Username and password are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        setMessage('User registered successfully');
        setUsername('');
        setPassword('');
        navigate('/login'); // Redirect to login
      } else {
        setMessage('Registration failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      setMessage('Signup error');
    }
  };

  const inputStyle = {
    width: '300px',
    padding: '10px',
    marginBottom: '15px',
    marginRight: '10px',
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Sign Up</button>
      </form>
      <p>{message}</p>
      <p>Already a user? <a href="/login" style={{ color: 'blue' }}>Login</a></p>
    </div>
  );
};

export default Signup;
