import React from 'react';
import './MyProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import ProfileStats from '../../Components/ProfileStats/ProfileStats.jsx';
import UserDescription from '../../Components/UserDescription/UserDescription.jsx';
import homeWhiteButton from '../../assets/homeWhiteButton.png';
import profilePic from '../../assets/profilePic.png';
import PostGallery from '../../Components/PostGallery/PostGallery.jsx';

function MyProfile({ userData }) {
    

  return (
    <div id='profile_container'>
      <header>
        <UserHeader username={userData.username} />
      </header>

      <section>
        <ProfileStats 
          postsCount={userData.posts} 
          friendsCount={userData.friends} 
          profilePic={userData.profilePic} 
        />
        <UserDescription 
          username={userData.username} 
          description={userData.description} 
        />
        <button id='edit_profile_button'>Edit Profile</button>
      </section>

      <PostGallery posts={userData.postsArray} />

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




/* import React from 'react';
import './MyProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import homeWhiteButton from '../../assets/homeWhiteButton.png';
import profilePic from '../../assets/profilePic.png';


function MyProfile() {
  return (
    <div>
        <header>
            <UserHeader></UserHeader>


        </header>
        <section>

        </section>
        <nav>
            <div>
                <img src={homeWhiteButton} alt="" />
            </div>
            <div>
                <img src={profilePic} alt="" />
            </div>

        </nav>
    </div>
  );
}

export default MyProfile; */