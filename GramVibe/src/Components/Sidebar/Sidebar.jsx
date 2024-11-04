import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <h2 className={styles.logo}>GramVibe</h2>
      <ul className={styles.menu}>
        <li>Home</li>
        <li>Notificaciones</li>
        <li>Crear</li>
        <li>Perfil</li>
      </ul>
    </div>
  );
};

export default Sidebar;
