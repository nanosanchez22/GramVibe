import './App.css'
import Feed from './Pages/MyFeed/MyFeed/'; 
import AuthPage from './Pages/AuthPage/AuthPage'
import Register from './Pages/Register/Register';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfile from './Pages/MyProfile/MyProfile';
import React from 'react';
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import user_profile from './assets/user_profile_pic.jpg';



function App() {

/*   const userData = {
    username: 'john_doe',               // Nombre de usuario
    posts: 120,                         // Número de publicaciones
    friends: 85,                        // Número de amigos
    profilePic: 'assets/profilePic.png', // URL de la imagen de perfil
    description: 'Just a simple guy!',   // Descripción del perfil
    postsArray: [
      { pic1 },
      { imageUrl: 'assets/pic2.jpg' },
      { imageUrl: 'GramVibe/src/assets/pic1.jpg' },
      // Agregar mas imagenes
    ],
  }; */

  return (

    <Router>
      <Routes>
      <div className="App">
        <main className="feed-container">
          <Route path='/' element={<Feed />} />
        </main>
      </div>
        <Route path='/login' element={<AuthPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myProfile/:userId' element={<MyProfile/>}/>
      </Routes>
    </Router>
  )

}
export default App;
