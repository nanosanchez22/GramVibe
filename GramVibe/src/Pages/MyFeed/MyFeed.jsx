import React, { useState, useEffect } from 'react';
import Post from '../../Components/Post/Post.jsx';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import styles from './MyFeed.module.css';
import FriendsCarousel from '../../Components/FriendsCarousel/FriendsCarousel.jsx';


const MyFeed = () => {
  

const [posts, setPosts] = useState([]);
const [friends, setFriends] = useState([]);
const userId = localStorage.getItem('userId');

useEffect(() => {
  // Fetch de publicaciones de amigos
  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/posts/feed', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        console.log('Publicaciones cargadas:', data);
        setPosts(data);
      } else {
        console.error('Error al cargar las publicaciones:', data.message);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };
  // Fetch de amigos
  const fetchFriends = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:3001/api/user/all', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();
      if (response.ok) {
        // Encuentra al usuario autenticado
        const currentUser = data.find((user) => user._id === userId);
        if (currentUser) {
          // Obtiene los IDs de los amigos
          const friendIds = currentUser.friends;

          // Filtra la información de los amigos
          const friendProfiles = data.filter((user) => friendIds.includes(user._id));

          setFriends(friendProfiles); // Actualiza el estado con la información de los amigos
        } else {
          console.error('Usuario no encontrado');
        }
      } else {
        console.error('Error al cargar amigos:', data.message);
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };
  fetchPosts();
  fetchFriends();
  console.log('friends', friends);
  console.log('posts', posts);
}, [userId]);  



return (
  <div className={styles.container}>
    <Sidebar />
    <div className={styles.feed}>
      <header className={styles.header}>
        <h1>GramVibe</h1>
      </header>
      {/* Carrusel de amigos */}
      <div className={styles.friendsCarousel}>
        <FriendsCarousel friends={friends} />
      </div>
      {/* Publicaciones */}
      <div className={styles.posts}>
        {posts.length ? (
          posts.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <p>Cargando publicaciones...</p>
        )}
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2024 GramVibe. Todos los derechos reservados.</p>
      </footer>
    </div>
  </div>
);
};


export default MyFeed;
