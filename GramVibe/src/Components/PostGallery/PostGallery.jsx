import React, { useEffect, useState } from 'react';
import './PostGallery.css';
import PostModal from '../PostModal/PostModal.jsx';

function PostGallery({ posts }) {
  const [selectedPost, setSelectedPost] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  }


  return (
    <>
    <div className="postGallery">
      <div className="photo-grid">
        {posts.map((post) => (
          <div key={post._id} className="photo-item" onClick={() => handleOpenModal(post)}>
            <img
              src={`http://localhost:3001/${post.imageUrl.replace('\\', '/')}`}
              alt={post.caption}
              className="gallery-photo"
              />
          </div>
        ))}
      </div>
    </div>

    {isModalOpen && <PostModal post={selectedPost} onClose={handleCloseModal} />}    
    
    </>
  );
}

export default PostGallery;



