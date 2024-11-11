import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Sidebar.module.css";
import { jwtDecode } from "jwt-decode";

const Sidebar = () => {
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  // Función para obtener el perfil del usuario y extraer el userId
  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          console.log("Token encontrado, iniciando fetch del perfil...");
          const response = await fetch(
            "http://localhost:3001/api/user/profile",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (!response.ok) {
            throw new Error("Error al obtener el perfil del usuario");
          }

          const data = await response.json();
          console.log("Datos del perfil obtenidos:", data);

          // Aquí asumimos que data tiene un campo userId
          if (data.userId) {
            setUserId(data.userId);
          } else {
            console.error("El perfil no contiene un userId");
          }
        } catch (error) {
          console.error("Error al obtener el perfil del usuario:", error);
        }
      } else {
        console.error("No se encontró un token en el localStorage");
      }
    };

    fetchUserProfile();
  }, []);

  // Función para navegar al perfil del usuario
  const goToProfile = () => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const idToken = decodedToken.userId;
      console.log("token", idToken);
      setUserId(idToken);
      navigate(`/myProfile/${idToken}`);
    } else {
      console.error("userId no está disponible, no se puede navegar al perfil");
    }
  };

  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>GramVibe</h2>
      <ul className={styles.menu}>
        <li className={styles.menuItem}>
          <i className="fas fa-home"></i> Home
        </li>
        <li className={styles.menuItem}>
          <i className="fas fa-heart"></i> Notifications
        </li>
        <li className={styles.menuItem}>
          <i className="fas fa-plus-square"></i> Create
        </li>
        <li className={styles.menuItem} onClick={goToProfile}>
          <i className="fas fa-user-circle"></i> Profile
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
