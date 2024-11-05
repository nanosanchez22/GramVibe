import React, { useEffect, useState } from "react"; // Importa useState correctamente
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formType, setFormType] = useState('register'); // Usa useState
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
    <div>
      {formType === 'register' && (
        <div>
          <h2>Register</h2>

          <div>
            <input type="text" value={user} placeholder="Username" onChange={(e) => setUser(e.target.value)}/>
          </div>

          <div>
            <input type="email" value={mail} placeholder="Email" onChange={(e) => setMail(e.target.value)}/>
          </div>

          <div>
            <input type="password" value={password} placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
          </div>

          <div>
            <button className='submit-register-button' onClick={handleRegister}>Register</button>
          </div>
        </div>
      )}

        <button onClick={() => navigate(-1)} className="back-button">
            Back
        </button>

    </div>
  );
};

export default Register;
