import React, { useEffect, useState } from 'react';
import './PostGallery.css';

function PostGallery() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const token = localStorage.getItem('token'); // JWT almacenado
      try {
        const response = await fetch('http://localhost:3001/api/posts/feed', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          setPosts(data); // Guardamos el array completo de publicaciones en el estado
        } else {
          console.error('Error al cargar las publicaciones:', data.message);
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="postGallery">
      <div className="photo-grid">
        {posts.map((post) => (
          <div key={post._id} className="photo-item">
            <img
              src={`http://localhost:3001/${post.imageUrl.replace('\\', '/')}`}
              alt={post.caption}
              className="gallery-photo"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostGallery;



