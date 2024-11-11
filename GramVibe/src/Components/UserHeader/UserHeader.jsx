import React from 'react';
import './UserHeader.css';
import linesButton from '../../assets/linesButton.png';
import addButton from '../../assets/addButton.png';

function UserHeader({ username }) {
  return (
    <div className="header_container">
      <div className="username_section">
        <h1>{username}</h1>
      </div>
      <div className="buttons_section">
        <button className="header_button">
          <img src={addButton} alt="Add" />
        </button>
        <button className="header_button">
          <img src={linesButton} alt="Menu" />
        </button>
      </div>
    </div>
  );
}

export default UserHeader;
