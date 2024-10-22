import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';



const AuthPage = () => {
  const [formType, setFormType] = useState('login'); // aparece por defecto el login de la cuenta
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
  }


  const handleFormSwitch = () => {
    navigate("/register");
  };

  return (
    <div>
      <h1 className="login-Title">GramVibe</h1>

      {/*solamente se muestra el formulario si el formType es login */}
      {formType === 'login' &&( 
      <div>
        <div>
        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
        </div>


        <div>
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
        </div>

        <div>
        <button className='login-button' onClick={handleLogin}>Login</button>
        </div>

      </div>
      )}

      <div>
        <div className='register-container'>
          <p className='account-text'>If you don't have an account, click here</p>
        <button className = 'register-button' onClick={handleFormSwitch}>Register</button>
        </div>
      </div>
      
    </div>
  );
};

export default AuthPage;
