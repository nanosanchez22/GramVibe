import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import './MyProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import ProfileStats from '../../Components/ProfileStats/ProfileStats.jsx';
import PostGallery from '../../Components/PostGallery/PostGallery.jsx';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';

function MyProfile() {
  const { userId } = useParams();
  const [profileData, setProfileData] = useState(null);
  const navigate = useNavigate();

  // Función para cargar los datos desde el localStorage
  const loadProfileData = () => {
    const storedProfilePic = localStorage.getItem('profilePic');
    const storedBio = localStorage.getItem('bio');

    setProfileData({
      username: 'agustink2', // Cambia por el nombre del usuario que corresponda
      profilePic: storedProfilePic || 'https://via.placeholder.com/150',
      bio: storedBio || 'No bio available',
      posts: 11,
      friends: 17,
      postsArray: [], // Aquí deberías cargar los posts reales
    });
  };

  useEffect(() => {
    loadProfileData();
  }, [userId, navigate]); // Dependencia en userId y navigate para asegurar la recarga al regresar

  // Función para manejar el clic en un post
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
        {/* Header con el nombre del usuario */}
        <header className="header">
          {profileData ? (
            <UserHeader username={profileData.username} />
          ) : (
            <p className="loading-text">Loading...</p>
          )}
        </header>

        {/* Información de perfil */}
        {profileData && (
          <>
            <section id="profileDetails">
              <div className="profile-info">
                <img
                  src={profileData.profilePic || "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="profile-picture"
                  onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
                />

                {/* Mostrar la bio del usuario debajo de la foto de perfil */}
                

                <div className="profile-stats-container">
                  <ProfileStats
                    postsCount={profileData.posts}
                    friendsCount={profileData.friends}
                  />
                  <button id="edit_profile_button" onClick={() => navigate(`/editProfile/${userId}`)}>
                    Edit Profile
                  </button>
                </div>
              </div>
              <p className="bio">{profileData.bio}</p>
            </section>
            
            {/* Galería de posts */}
            <PostGallery
              posts={profileData.postsArray || []}
              onPostClick={handlePostClick}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default MyProfile;
