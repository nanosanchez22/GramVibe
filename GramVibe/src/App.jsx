

import React from 'react';
import Feed from './Pages/MyFeed/MyFeed/'; 
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="app-header">
        <h1 className='header'>GramVibe</h1>
      </header>

      <main className="feed-container">
        <Feed />
      </main>

      <footer className="app-footer">
        <p>&copy; 2024 GramVibe. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default App;

