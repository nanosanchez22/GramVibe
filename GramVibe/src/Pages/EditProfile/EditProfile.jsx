import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditProfile.css';

const EditProfile = () => {
  const { userId } = useParams(); // Obtener el userId para la redirección
  const [profilePic, setProfilePic] = useState(null);
  const [bio, setBio] = useState('');
  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };

  const handleBioChange = (e) => {
    setBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Guardar la foto de perfil y la bio en el localStorage
    if (profilePic) {
      // Aquí podrías convertir la imagen en base64 si es necesario
      localStorage.setItem('profilePic', URL.createObjectURL(profilePic));
    }
    if (bio.trim() !== '') {
      localStorage.setItem('bio', bio);
    }

    // Navegar de vuelta al perfil del usuario después de guardar los cambios
    navigate(`/myProfile/${userId}`);
  };

  return (
    <div className="editProfileContainer">
      <h2 className="editProfileTitle">Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="profilePictureContainer">
          <label>
            Profile Picture:
            <input type="file" onChange={handleProfilePicChange} className="uploadButton" />
          </label>
        </div>
        <label>
          Bio:
          <textarea value={bio} onChange={handleBioChange} className="bioInput" />
        </label>
        <br />
        <button type="submit" className="saveButton">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfile;
