import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchModal.module.css';

const SearchModal = ({ onClose }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAllUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:3001/api/user/all', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        } else {
          console.error('Error al obtener los usuarios');
        }
      } catch (error) {
        console.error('Error en la conexión:', error);
      }
    };

    fetchAllUsers();
  }, []);

  // Filtrar usuarios al escribir en el input
  useEffect(() => {
    const results = users.filter((user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredUsers(results);
  }, [searchQuery, users]);

  const handleNavigateToProfile = (userId) => {
    navigate(`/profile/${userId}`);
    onClose();
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContent}>
        <button className={styles.closeButton} onClick={onClose}>
          ✖
        </button>
        <h2>Buscar Usuarios</h2>
        <input
          type="text"
          placeholder="Escribe un nombre de usuario..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={styles.searchInput}
        />
        <ul className={styles.userList}>
          {filteredUsers.map((user) => (
            <li
              key={user._id}
              className={styles.userItem}
              onClick={() => handleNavigateToProfile(user._id)}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchModal;
