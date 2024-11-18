import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadModal from '../UploadModal/UploadModal';
import SearchModal from '../SearchModal/SearchModal';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  const [userId, setUserId] = useState(localStorage.getItem('userId'));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

/*   const handleSearch = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/user/all');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      } else {
        console.error('Error al obtener usuarios');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  }; */

  const handleSearch = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error('No se encontró un token en el localStorage');
      return;
    }

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
        console.error('Error al obtener usuarios');
      }
    } catch (error) {
      console.error('Error al conectar con el servidor:', error);
    }
  };

  useEffect(() => {
    if (isSearchModalOpen) {
      handleSearch();
    }
  }, [isSearchModalOpen]);

  const filteredUsers = users.filter((user) =>
    user.username.toLowerCase().includes(searchTerm.toLowerCase())
  );


  const handleUpload = async (data) => {
    const token = localStorage.getItem('token');
    const formData = new FormData();
    formData.append('image', data.image);
    formData.append('description', data.description);

    try {
      const response = await fetch('http://localhost:3001/api/posts/upload', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        console.log("Foto subida con éxito");
        // Aquí puedes refrescar el feed o mostrar una notificación de éxito
      } else {
        console.error("Error al subir la foto");
      }
    } catch (error) {
      console.error("Error en la conexión al subir la foto:", error);
    }
  };

  // Función para obtener el perfil del usuario y extraer el userId
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem('token');
      const userIdStorage = localStorage.getItem('userId');
      if (token && userIdStorage) {
        try {
          console.log('Token encontrado, iniciando fetch del perfil...');
          const response = await fetch(`http://localhost:3001/api/user/profile/${userId}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            throw new Error('Error al obtener el perfil del usuario');
          }

          const data = await response.json();
          console.log('Datos del perfil obtenidos:', data);

          // Aquí asumimos que data tiene un campo userId
          if (data.user._id) {
            setUserId(data.user._id);
          } else {
            console.error('El perfil no contiene un userId');
          }
        } catch (error) {
          console.error('Error al obtener el perfil del usuario:', error);
        }
      } else {
        console.error('No se encontró un token en el localStorage');
      }
    };

    fetchUserProfile();
  }, [userId]);

  // Función para navegar al perfil del usuario
  const goToProfile = () => {
    if (userId) {
      console.log('Navegando al perfil del usuario con userId:', userId);
      navigate(`/myProfile/${userId}`);
    } else {
      console.error('userId no está disponible, no se puede navegar al perfil');
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>GramVibe</h2>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <Link to="/myFeed">
          <i className="fas fa-home"></i> Home
          </Link>
        </li>
        <li className={styles.menuItem} onClick={() => setIsSearchModalOpen(true)}>
          <i className='fas fa-magnifying-glass'></i> Busqueda
        </li>
        <li className={styles.menuItem}>
          <i className="fas fa-heart"></i> Notifications
        </li>
        <li className={styles.menuItem} onClick={()=> setIsModalOpen(true)}>
          <i className="fas fa-plus-square"></i> Create
        </li>
        <li className={styles.menuItem} onClick={goToProfile}>
          <Link to={`/myProfile/${localStorage.getItem('userId')}`}>
          <i className="fas fa-user-circle"></i> Profile
          </Link>
        </li>
      </ul>
      <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onUpload={handleUpload} />
      {isSearchModalOpen && (
        <SearchModal onClose={() => setIsSearchModalOpen(false)} onSearch={handleSearch} />
      )}
{/*       {<SearchModal isOpen={isSearchModalOpen} onClose={() => setIsSearchModalOpen(false)} users={filteredUsers} />}  */}    </div>
  );
};

export default Sidebar;
