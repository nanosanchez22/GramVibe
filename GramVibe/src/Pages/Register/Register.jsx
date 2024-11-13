import React, { useEffect, useState } from "react"; 
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const [formType, setFormType] = useState('register'); 
  const navigate = useNavigate();

  const [user, setUser] = useState('');
  const [mail, setMail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    const response = await fetch('http://localhost:3001/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username:user, email:mail, password, }),
    });

    if (response.ok) {
      const body = await response.json();
      /*localStorage.setItem('token', body.token);*/
      navigate('/login');
    }

    console.log(response);
  };


  return (
    <div className="registerPage-container">
      <div className="registerPage-card">
        <h2 className="register-title">Create Your Account</h2>

        <div className="form-container">
          <input
            type="text"
            className="input-field"
            placeholder="Username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="email"
            className="input-field"
            placeholder="Email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
          />
          <input
            type="password"
            className="input-field"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className="button submit-register-button" onClick={handleRegister}>
            Register
          </button>
        </div>

        <div className="back-container">
          <button onClick={() => navigate(-1)} className="button back-button">
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
