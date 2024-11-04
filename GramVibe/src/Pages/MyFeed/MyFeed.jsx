import React, { useState, useEffect } from 'react';
import Post from '../../Components/Post/Post.jsx';
import Sidebar from '../../Components/Sidebar/Sidebar.jsx';
import styles from './MyFeed.module.css';

const initialPosts = [
  {
    id: 1,
    username: 'user1',
    userAvatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    imageUrl: 'https://via.placeholder.com/600x400',
    description: 'Un día genial en la playa!',
    likes: 6880,
    comments: ['Hermoso!', 'Quiero ir ahí!'],
  },
  {
    id: 2,
    username: 'user2',
    userAvatar: 'https://randomuser.me/api/portraits/women/2.jpg',
    imageUrl: 'https://via.placeholder.com/600x400',
    description: 'Amando mi nueva cámara 📸',
    likes: 89,
    comments: ['¡Qué buena foto!', 'Increíble detalle!'],
  }
];

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(initialPosts); 
  }, []);

  return (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.feedContainer}>
        <header className={styles.appHeader}>
          <h1>GramVibe</h1>
        </header>

        <div className={styles.posts}>
          {posts.length ? (
            posts.map((post) => <Post key={post.id} post={post} />)
          ) : (
            <p>Cargando publicaciones...</p>
          )}
        </div>

        <footer className={styles.appFooter}>
          <p>&copy; 2024 GramVibe. Todos los derechos reservados.</p>
        </footer>
      </div>
    </div>
  );
};

export default Feed;
