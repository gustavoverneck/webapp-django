// src/context/AuthContext.js
import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const storedTokens = localStorage.getItem('authTokens');
  const storedUser = localStorage.getItem('user');

  const [authTokens, setAuthTokens] = useState(() =>
    storedTokens ? JSON.parse(storedTokens) : null
  );

  const [user, setUser] = useState(() =>
    storedUser ? JSON.parse(storedUser) : null
  );

  const loginUser = async (email, password) => {
    const response = await fetch('http://localhost:8000/api/token/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('authTokens', JSON.stringify(data));
      localStorage.setItem('user', JSON.stringify(data.user));  // Salva o user no localStorage
      setAuthTokens(data);
      setUser(data.user);  // Usa o user direto da resposta da API
    } else {
      alert('Login failed');
    }
  };

  const logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('authTokens');
    localStorage.removeItem('user');  // Remove o user também
  };

  const contextData = {
    user,
    authTokens,
    loginUser,
    logoutUser,
  };

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};

export default AuthContext;