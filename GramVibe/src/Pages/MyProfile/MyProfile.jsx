import React, { useEffect } from 'react';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './MyProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import ProfileStats from '../../Components/ProfileStats/ProfileStats.jsx';
import UserDescription from '../../Components/UserDescription/UserDescription.jsx';
import homeWhiteButton from '../../assets/homeWhiteButton.png';
import profilePic from '../../assets/profilePic.png';
import PostGallery from '../../Components/PostGallery/PostGallery.jsx';

function MyProfile() {

  const { userId } = useParams();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [description, setDescription] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfileData = async () => { 
      try{

        const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        
        if (!response.ok) {
          throw new Error('Failed to fetch profile data');
        }
        
          const data = await response.json();
          setProfileData(data);
          setDescription(data.description);
        
      } catch (error) {
        console.error('Error fetching profile data:', error);
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
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: formData
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
    return <h1>Not Implemented</h1>;
  }
    

  return (
    <div id='profile_container'>
      <header>
        <UserHeader username={profileData.username} />
      </header>

      <section>
        <ProfileStats 
          postsCount={profileData.posts} 
          friendsCount={profileData.friends} 
          profilePic={profileData.profilePic} 
        />
        {isEditing ? (
          <div>
            <input 
              type="text" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
            />
            <input 
              type="file" 
              onChange={(e) => setNewProfilePic(e.target.files[0])} 
            />
            <button onClick={handleEditProfile}>Save</button>
          </div>
        ) : (
          <UserDescription 
            username={profileData.username} 
            description={profileData.description} 
          />
        )}
        <button id='edit_profile_button' onClick={() => setIsEditing(true)}>Edit Profile</button>
      </section>

      <PostGallery posts={profileData.postsArray || [] } onPostClick={handlePostClick} />

      <nav>
        <div>
          <img src={homeWhiteButton} alt="Home button" />
        </div>
        <div>
          <img src={profilePic} alt="Profile button" />
        </div>
      </nav>
    </div>
  );
}

export default MyProfile;


