import React, { useEffect, useState }from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './FriendsCarousel.module.css';


const FriendsCarousel = () => {
  
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchFriends = async () => {
      const token = localStorage.getItem('token');
      const userId = localStorage.getItem('userId');
      try {
        const response = await fetch('http://localhost:3001/api/user/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          const currentUser = data.find(user => user._id === userId);
          if (currentUser && currentUser.friends) {
            const friendsList = data.filter(user => currentUser.friends.includes(user._id));
            setFriends(friendsList);
          } else {
            console.error('No se encontraron amigos para el usuario actual');
          }
        } else {
          console.error('Error al obtener la lista de usuarios');
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      }
    };
  
    fetchFriends();
  }, []);

  const handleViewProfile = (friendId) => {
    navigate(`/profile/${friendId}`);
  };



  return (
    <div className={styles.carouselContainer}>
      <h3 className={styles.carouselTitle}>View your friends profile</h3>
      <div className={styles.carousel}>
        {friends.map(friend => (
          <div key={friend._id} className={styles.friendCard}>
            <img src={friend.profilePicture || 'https://via.placeholder.com/150'} alt={friend.username} className={styles.friendImage} />
            <p className={styles.friendName}>{friend.username}</p>
            <button className={styles.viewButton} onClick={() => handleViewProfile(friend._id)}>View</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendsCarousel;
