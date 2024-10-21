import React from 'react';
import './ProfileStats.css';

function ProfileStats({ postsCount, friendsCount, profilePic }) {
  return (
    <div id='stats_container'>
      <div>
        <img src={profilePic} alt="Profile" />
      </div>
      <div>
        <div>
          <span>{postsCount}</span>
          <p>Posts</p>
        </div>
        <div>
          <span>{friendsCount}</span>
          <p>Friends</p>
        </div>
      </div>
    </div>
  );
}

export default ProfileStats;
