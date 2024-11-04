import React, { useState } from 'react';
import styles from './Post.module.css';

const Post = ({ post }) => {
  const [comments, setComments] = useState(post.comments);
  const [showCommentInput, setShowCommentInput] = useState(false);
  const [newComment, setNewComment] = useState('');

  // Función para mostrar el campo de entrada de comentarios
  const handleShowCommentInput = () => {
    setShowCommentInput(true);
  };

  // Función para agregar un nuevo comentario
  const handleAddComment = (e) => {
    e.preventDefault();
    if (newComment.trim() !== '') {
      setComments((prevComments) => [...prevComments, newComment]);
      setNewComment('');
      setShowCommentInput(false); // Ocultar el campo después de agregar el comentario
    }
  };

  return (
    <div className={styles["feed-item"]}>
      <div className={styles["feed-item-header"]}>
        <img src={post.userAvatar} alt={`${post.username}'s avatar`} />
        <h3>{post.username}</h3>
      </div>
      <img className={styles["post-image"]} src={post.imageUrl} alt="Post" />

      <div className={styles["actions"]}>
        <button className={styles.likeButton}>❤️</button> {/* Botón de like sin funcionalidad */}
        <p className={styles.likes}>{post.likes} Me gusta</p> {/* Mostrar la cantidad inicial de likes sin incrementar */}
        <p className={styles.commentsTitle} onClick={handleShowCommentInput} style={{ cursor: 'pointer' }}>
          💬 {comments.length} Comentarios
        </p>
      </div>

      <div className={styles["feed-item-info"]}>
        <p className={styles.descripcion}><strong>{post.username}</strong> {post.description}</p>
        
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
          {comments.map((comment, index) => (
            <p key={index} className={styles.comment}><strong>Usuario:</strong> {comment}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
