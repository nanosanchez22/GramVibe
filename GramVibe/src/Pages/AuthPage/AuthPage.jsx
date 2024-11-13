import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';

const AuthPage = () => {
  const [formType, setFormType] = useState('login'); // Aparece por defecto el login de la cuenta
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const response = await fetch('http://localhost:3001/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const body = await response.json();
      localStorage.setItem('token', body.token);
      const userId = body._id;
      navigate(`/myProfile/${userId}`);
    }

    console.log(response);
  };

  const handleFormSwitch = () => {
    navigate('/register');
  };

  return (
    <div className="authPage-container">
      <div className="authPage-card">
        <h1 className="login-title">GramVibe</h1>

        {/* Solamente se muestra el formulario si el formType es login */}
        {formType === 'login' && (
          <div className="form-container">
            <input
              type="text"
              className="input-field"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="input-field"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="button login-button" onClick={handleLogin}>
              Login
            </button>
          </div>
        )}

        <div className="register-container">
          <p className="account-text">If you don't have an account, click here:</p>
          <button className="button register-button" onClick={handleFormSwitch}>
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default AuthPage;
