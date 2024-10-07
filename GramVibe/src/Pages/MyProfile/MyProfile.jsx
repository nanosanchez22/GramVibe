import React from 'react';
import './MyProfile.css';
import UserHeader from '../../Components/UserHeader/UserHeader.jsx';
import homeWhiteButton from '../../assets/homeWhiteButton.png';
import profilePic from '../../assets/profilePic.png';


function MyProfile() {
  return (
    <div>
        <header>
            <UserHeader></UserHeader>
            <h1>my profile</h1>


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

export default MyProfile;