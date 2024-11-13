import React from 'react';
import './ProfileStats.css';

function ProfileStats({ postsCount, friendsCount }) {
  return (
    <div id="stats_container">
      <div className="stat-item">
        <span className="stat-number">{postsCount}</span>
        <p className="stat-label">Posts</p>
      </div>
      <div className="stat-item">
        <span className="stat-number">{friendsCount}</span>
        <p className="stat-label">Friends</p>
      </div>
    </div>
  );
}

export default ProfileStats;
