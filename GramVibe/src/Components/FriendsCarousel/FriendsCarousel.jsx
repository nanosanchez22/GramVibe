import React from 'react';
import styles from './FriendsCarousel.module.css';

const friendsData = [
  { id: 1, name: 'Kirti Chadha', profilePic: 'https://randomuser.me/api/portraits/women/10.jpg' },
  { id: 2, name: 'Durgesh Nandini', profilePic: 'https://randomuser.me/api/portraits/women/20.jpg' },
  { id: 3, name: 'Rahul Sharma', profilePic: 'https://randomuser.me/api/portraits/men/30.jpg' },
  { id: 4, name: 'Nina Patel', profilePic: 'https://randomuser.me/api/portraits/women/40.jpg' }
];

const FriendsCarousel = () => {
  return (
    <div className={styles.carouselContainer}>
      <h3 className={styles.carouselTitle}>View your friends profile</h3>
      <div className={styles.carousel}>
        {friendsData.map(friend => (
          <div key={friend.id} className={styles.friendCard}>
            <img src={friend.profilePic} alt={friend.name} className={styles.friendImage} />
            <p className={styles.friendName}>{friend.name}</p>
            <button className={styles.viewButton}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsCarousel;
