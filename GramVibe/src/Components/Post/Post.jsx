import React, { useState } from 'react';
import styles from './Post.module.css';
import PostModal from '../PostModal/PostModal.jsx';

const Post = ({ post }) => {
  const [likes, setLikes] = useState(post.likes || []);
  const [comments, setComments] = useState(post.comments || [] );
  const [newComment, setNewComment] = useState('');
  const [showCommentInput, setShowCommentInput] = useState(false);


/*   const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const handleOpenModal = () => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
    setIsModalOpen(false);
  }; */

  const userId = localStorage.getItem('userId');
  const isLikedByCurrentUser = likes.includes(localStorage.getItem('userId'));

  const handleLikeToggle = async () => {
    const token = localStorage.getItem('token');
    const url = `http://localhost:3001/api/posts/${post._id}/like`;

    try {
      const response = await fetch(url, {
        method: isLikedByCurrentUser ? 'DELETE' : 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setLikes(updatedPost.likes || []);
      } else {
        console.error('Error al actualizar el like');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${post._id}/comments`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setComments(prev => [...prev, updatedPost]);
        setNewComment('');
        setShowCommentInput(false);
      } else {
        console.error('Error al agregar comentario');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  const handleRemoveComment = async (commentId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:3001/api/posts/${post._id}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const updatedPost = await response.json();
        setComments(prev => prev.filter(comment => comment._id !== updatedPost._id));
      } else {
        console.error('Error al eliminar comentario');
      }
    } catch (error) {
      console.error('Error en la conexión:', error);
    }
  };

  if (!post) {
    return null;
  }


  return (
    <div className={styles["feed-item"]}>
      <div className={styles["feed-item-header"]}>
        <img
          src={post.user?.profilePicture || 'https://via.placeholder.com/50'}
          alt={`${post.user?.username || 'Usuario'}'s avatar`}
        />
        <h3>{post.user?.username || 'Usuario'}</h3>
      </div>

      <img
        className={styles["post-image"]}
        src={`http://localhost:3001/${post.imageUrl.replace('\\', '/')}`}
        alt={post.caption}
        /* onClick={handleOpenModal} */
      />

      <div className={styles["actions"]}>
        <button
          className={styles.likeButton}
          onClick={handleLikeToggle}
          style={{ color: isLikedByCurrentUser ? '#e63946' : '#ccc' }}
        >
          ❤️
        <p className={styles.likes}>{likes.length} Me gusta</p>
        </button>
        <p
          className={styles.commentsTitle}
          onClick={() => setShowCommentInput((prev) => !prev)}
          style={{ cursor: 'pointer' }}
        >
          💬 {comments?.length} Comentarios
        </p>
      </div>

      <div className={styles["feed-item-info"]}>
        <p className={styles.descripcion}>
          <strong>{post.user?.username || 'Usuario'}</strong> {post.caption || ''}
        </p>

        {showCommentInput && (
          <form onSubmit={handleAddComment} className={styles.commentForm}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              className={styles.commentInput}
              placeholder="Escribe un comentario..."
            />
            <button type="submit" className={styles.commentButton}>Agregar</button>
          </form>
        )}

        <div className={styles.comments}>
          {comments.map((comment) => (
            <p key={comment._id} className={styles.comment}>
              <strong>{comment.user?.username || 'Usuario'}: </strong> {comment.content}
              <button
                onClick={() => handleRemoveComment(comment._id)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#e63946',
                  cursor: 'pointer',
                  marginLeft: '10px',
                }}
              >
                ✕
              </button>
            </p>
          ))}
        </div>
{/*         {isModalOpen && <PostModal post={selectedPost} onClose={handleCloseModal} />}
 */}      </div>
    </div>
  );
};


export default Post;
