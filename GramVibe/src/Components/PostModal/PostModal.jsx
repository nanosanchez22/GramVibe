import React, { useEffect, useState } from 'react';
import './PostModal.css';

const PostModal = ({ post, onClose }) => {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        const fetchComments = async () => {
          const token = localStorage.getItem('token');
          const commentDetails = await Promise.all(
            post.comments.map(async (commentId) => {
              try {
                const response = await fetch(`http://localhost:3001/api/posts/comments/${commentId}`, {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                });
    
                if (response.ok) {
                  return await response.json();
                } else {
                  console.error('Error al obtener el comentario', commentId);
                  return null;
                }
              } catch (error) {
                console.error('Error en la conexión:', error);
                return null;
              }
            })
          );
    
          setComments(commentDetails.filter(comment => comment !== null));
        };
    
        fetchComments();
      }, [post.comments]);




  if (!post) return null;

  return (
    <div className="post-modal">
      <div className="post-modal-content">
        <button className="close-modal" onClick={onClose}>✕</button>
        <img 
          src={`http://localhost:3001/${post.imageUrl.replace('\\', '/')}`} 
          alt="Post" 
          className="modal-image" 
        />
        <div className="post-details">
          <h3>{post.user.username}</h3>
          <p>{post.caption}</p>
          <div className="post-stats">
            <p>❤️ {post.likes.length} Likes</p>
            <p>💬 {comments.length} Comments</p>
          </div>
          <div className="comments">
            {comments.map((comment, index) => (
              <p key={index}>
                <strong>{comment.user?.username || 'User'}: </strong> {comment.content}
                </p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
