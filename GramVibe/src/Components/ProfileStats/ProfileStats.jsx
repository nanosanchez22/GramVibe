import React from 'react';
import './ProfileStats.css';

function ProfileStats({ postsCount, friendsCount }) {
  return (
    <div id="stats_container">
      <div className="stat-item">
        <span className="stat-title">Posts</span>
        <span className="stat-count">{postsCount}</span>
      </div>
      <div className="stat-item">
        <span className="stat-title">Friends</span>
        <span className="stat-count">{friendsCount}</span>
      </div>
    </div>
  );
}

export default ProfileStats;
