import React, { useState } from "react"; // Importa useState correctamente
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [formType, setFormType] = useState('register'); // Usa useState
  const navigate = useNavigate();

  return (
    <div>
      {formType === 'register' && (
        <div>
          <h2>Register</h2>

          <div>
            <input type="text" placeholder="Username" />
          </div>

          <div>
            <input type="email" placeholder="Email" />
          </div>

          <div>
            <input type="password" placeholder="Password" />
          </div>

          <div>
            <button className='submit-register-button'>Register</button>
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
