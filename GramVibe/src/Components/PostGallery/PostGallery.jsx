import React from 'react';
import './PostGallery.css';

function PostGallery({ posts }) {
  return (
    <div className="post-gallery">
      {posts.map((post, index) => (
        <div key={index} className="post">
          <img src={post.imageUrl} alt={`Post ${index + 1}`} />
        </div>
      ))}
    </div>
  );
}

export default PostGallery;
