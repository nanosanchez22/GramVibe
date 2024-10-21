import React from 'react';
import './UserDescription.css';

function UserDescription({ username, description }) {
  return (
    <div id='description_container'>
      <h3>{username}</h3>
      <p>{description}</p>
    </div>
  );
}

export default UserDescription;
