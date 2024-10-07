import React from 'react';
import './UserHeader.css';
import linesButton from '../../assets/linesButton.png';
import addButton from '../../assets/addButton.png';


function UserHeader() {
  return ( 
    <>
    <div id='header_container'>
        <div>
            userName
        </div>
        <div>
            <div>
                <img src={addButton} alt="" />
                <img src={linesButton} alt="" />
            </div>
        </div>
    </div>

    <div>
        <div>
            <img src="" alt="profile pic" />
        </div>
        <div>
            <div>
                <div>#post</div>
                <div>posts</div>
            </div>
            <div>
                <div>#frends</div>
                <div>friends</div>
            </div>
        </div>
    </div>

    <div>
        <div><h3>username</h3></div>
        <div><p>my profile description</p></div>
    </div>

    <div>
        <button>Edit Profile</button>
    </div>


    </>
    );
}

export default UserHeader;