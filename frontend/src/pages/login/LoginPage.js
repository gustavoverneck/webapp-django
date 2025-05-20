import React, { useState, useContext } from 'react';
import AuthContext from '../../context/AuthContext';
import '../../global.css';
import './LoginPage.css';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const { loginUser } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email, password);
  };
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  
  return (
    <div className="login-container">
      <img src={process.env.PUBLIC_URL + "/numen-logoblack.png"} alt="Logo" className="login-logo" />
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
