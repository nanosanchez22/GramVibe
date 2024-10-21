import React, { useState } from 'react';
import './AuthPage.css';
import { useNavigate } from 'react-router-dom';



const AuthPage = () => {
  const [formType, setFormType] = useState('login'); // aparece por defecto el login de la cuenta
  const navigate = useNavigate();


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
        <input type="text" placeholder="Username" />
        </div>


        <div>
        <input type="password" placeholder="Password" />
        </div>

        <div>
        <button className='login-button'>Login</button>
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
