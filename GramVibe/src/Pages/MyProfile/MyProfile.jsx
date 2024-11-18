import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MyProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import ProfileStats from '../../Components/ProfileStats/ProfileStats.jsx';
import UserDescription from '../../Components/UserDescription/UserDescription.jsx';
import PostGallery from '../../Components/PostGallery/PostGallery.jsx';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';


function MyProfile() {
  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [username, setUsername] = useState('');
  const [description, setDescription] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });

        if (!response.ok) {
          throw new Error('Error al obtener el perfil del usuario');
        }

        const data = await response.json();
        setProfileData(data);
        setUsername(data.user.username);
        setDescription(data.user.description);
        // setProfilePicture(data.user.profilePicture);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    fetchProfileData();
  }, [userId]);


  console.log("profile data", profileData);

  const handleEditProfile = async () => {
    const token = localStorage.getItem('token');
    
    const updatedProfileData = {
      username,
      description,
      profilePicture, 
    };

    console.log('Datos enviados:', updatedProfileData);

    try {
      const response = await fetch('http://localhost:3001/api/user/profile/edit', {
        method: 'PUT',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedProfileData),
      });

      if (response.ok) {
        const updatedData = await response.json();
        console.log("Perfil actualizado correctamente", updatedData);
        setProfileData((prevData) => ({
          ...prevData,
          user: {
            ...prevData.user,
            username: updatedData.user.username,
            description: updatedData.user.description,
            profilePicture: updatedData.user.profilePicture,
          },
        }));
        setIsEditing(false);
      } else {
        console.error("Error al actualizar el perfil");
      }
    } catch (error) {
      console.error("Error en la conexión al actualizar el perfil:", error);
    }
  };

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  if (!profileData) {
    return <h1>Loading...</h1>;
  }

  return (
    <div id="profile_container">
      <Sidebar />
      <div id="profileContent">
  
        {/* Información de perfil */}
        {profileData && (
          <>
            <section id="profileDetails">
              <div className="profile-info">
                <img
                  src={profileData.user.profilePicture || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="profile-picture"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />
                
                <div className="profile-stats-container">
                  {/* Descripción del usuario */}
                  <UserDescription 
                    username={profileData.user.username} 
                  />
                  <ProfileStats
                    postsCount={profileData.posts ? profileData.posts.length : 0}
                    friendsCount={profileData.user.friends ? profileData.user.friends.length : 0}
                    profilePic={profileData.user.profilePicture || ""}
                  />
                  <button id="edit_profile_button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                              {/* Descripción del usuario */}
                <UserDescription 
                  description={profileData.user.description} 
                />
                </div>
              </div>


              {/* Formulario de edición del perfil */}
              {isEditing && (
                <div id="editProfile">
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Nuevo nombre de usuario"
                    className="editInput"
                  />
                  <input
                    type="text"
                    value={profilePicture}
                    onChange={(e) => setProfilePicture(e.target.value)}
                    placeholder="URL de la nueva imagen de perfil"
                    className="editInput"
                  />
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Nueva descripción"
                    className="editInput"
                  />
                  <button onClick={handleEditProfile} id="saveButton">
                    Guardar cambios
                  </button>
                  <button onClick={() => setIsEditing(false)} id="cancelButton">
                    Cancelar
                  </button>
                </div>
              )}

            </section>
  
            {/* Galería de posts */}
            <PostGallery
              posts={profileData.posts || []}
              onPostClick={handlePostClick}
            />
          </>
        )}
      </div>
    </div>
  );
  
  
}

export default MyProfile;
