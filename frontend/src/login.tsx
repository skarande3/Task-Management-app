import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setMessage('Username and password are required.');
      return;
    }
    try {
      const response = await fetch('http://localhost:4000/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        console.log('Token set:', data.token);
        navigate('/manage-tasks'); // Redirect to tasks page
      } else {
        setMessage('Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setMessage('Login error');
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
      <h2>Login</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px' }}>
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
        <button type="submit" style={{ padding: '10px 20px' }}>Login</button>
      </form>
      <p>{message}</p>
      <p>Don't have an account? <a href="/signup" style={{ color: 'blue' }}>Sign Up</a></p>
    </div>
  );
};

export default Login;
