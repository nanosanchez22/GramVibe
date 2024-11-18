import React from 'react';
import './ProfileStats.css';

const  ProfileStats =  ({ postsCount, friendsCount, profilePic }) => {
  return (
    <div id="stats_container">
      <div className="stat-item">
        <span className="stat-count">{postsCount}</span>
        <span className="stat-title"> Posts</span>
      </div>
      <div className="stat-item">
        <span className="stat-count">{friendsCount}</span>
        <span className="stat-title"> Friends</span>
      </div>
    </div>
  );
}

export default ProfileStats;
