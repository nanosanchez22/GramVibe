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
  const [description, setDescription] = useState('');
  const [newProfilePic, setNewProfilePic] = useState(null);
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
        setDescription(data.description);
      } catch (error) {
        console.error('Error al obtener el perfil del usuario:', error);
      }
    };
    fetchProfileData();
  }, [userId]);

  const handleEditProfile = async () => {
    const formData = new FormData();
    formData.append('description', description);
    if (newProfilePic) {
      formData.append('profilePic', newProfilePic);
    }

    const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: formData,
    });

    if (response.ok) {
      const updatedData = await response.json();
      setProfileData(updatedData);
      setIsEditing(false);
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
                <div className="profile-stats-container">
                  <ProfileStats
                    postsCount={profileData.posts}
                    friendsCount={profileData.friends}
                    profilePic={profileData.profilePic}
                  />
                  <button id="edit_profile_button" onClick={() => setIsEditing(true)}>
                    Edit Profile
                  </button>
                </div>
              </div>
  
              {isEditing && (
                <div id="editProfile">
                  <input
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="editInput"
                  />
                  <input
                    type="file"
                    onChange={(e) => setNewProfilePic(e.target.files[0])}
                    className="fileInput"
                  />
                  <button onClick={handleEditProfile} id="saveButton">
                    Save
                  </button>
                </div>
              )}
              {/* {!isEditing && (
                <UserDescription
                  username={profileData.username}
                  description={profileData.description}
                />
              )} */}
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
