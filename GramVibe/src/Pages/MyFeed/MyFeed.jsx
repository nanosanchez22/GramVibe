
import React, { useState, useEffect } from 'react';
import Post from '../../Components/Post/Post.jsx';
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
  },
  {
    id: 3,
    username: 'user3',
    userAvatar: 'https://randomuser.me/api/portraits/women/4.jpg',
    imageUrl: 'https://via.placeholder.com/600x400',
    description: 'Amando mi nueva cámara 📸',
    likes: 678,
    comments: ['¡Qué buena foto!', 'WOW', 'OMG'],
  }
  
];

const Feed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setPosts(initialPosts); 
  }, []);

  return (
    <div className={styles.feed}>
      <header className="app-header">
        <h1>GramVibe</h1>
      </header>

      {posts.length ? (
        posts.map((post) => <Post key={post.id} post={post} />)
      ) : (
        <p>Cargando publicaciones...</p>
      )}
      
      <footer className="app-footer">
        <p>&copy; 2024 GramVibe. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default Feed;
