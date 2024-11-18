import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './UserProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import ProfileStats from '../../Components/ProfileStats/ProfileStats.jsx';
import PostGallery from '../../Components/PostGallery/PostGallery.jsx';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import UserDescription from '../../Components/UserDescription/UserDescription.jsx';

function UserProfile() {
  const { userId } = useParams(); // Obtiene el ID del usuario desde la URL
  const [profileData, setProfileData] = useState(null);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchProfileData = async () => {
        const token = localStorage.getItem('token');
        try {
            const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
            headers: {
                Authorization: `Bearer ${token}`, 
            },
            });
            if (!response.ok) {
                throw new Error('Error al obtener el perfil del usuario');
            }
            const data = await response.json();
            console.log(data);
            setProfileData(data);
            setPosts(data.posts);
        } catch (error) {
            console.error('Error al obtener el perfil del usuario:', error);
        }
        };
    fetchProfileData();
  }, [userId]);

  if (!profileData) {
    return <h1>Cargando...</h1>;
  }

  const handleAddFriend = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/user/add-friend/${userId}`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Amigo agregado correctamente.');
      } else {
        console.error('Error al agregar amigo.');
      }
    } catch (error) {
      console.error('Error en la conexión al agregar amigo:', error);
    }
  };

  return (
    <div id="profile_container">
      <Sidebar />
      <div id="profileContent">
        <section id="profileDetails">
          <div className="profile-info">
            <img
              src={profileData.user.profilePicture || 'https://via.placeholder.com/150'}
              alt="Profile"
              className="profile-picture"
              onError={(e) => (e.target.src = 'https://via.placeholder.com/150')}
            />
            <div className="profile-stats-container">
              <UserDescription
                username={profileData.user.username}
              />
              <ProfileStats
                postsCount={profileData.posts ? profileData.posts.length : 0}
                friendsCount={profileData.user.friends ? profileData.user.friends.length : 0}
                profilePic={profileData.user.profilePicture || ''}
              />
              <button id="add_friend_button" onClick={handleAddFriend}>
                Agregar amigo
              </button>
              <UserDescription
                description={profileData.user.description}
              />
            </div>
          </div>
        </section>
        <PostGallery posts={posts} />
      </div>
    </div>
  );
}

export default UserProfile;
