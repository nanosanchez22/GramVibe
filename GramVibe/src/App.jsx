import './App.css'
import Feed from './Pages/MyFeed/MyFeed/'; 
import AuthPage from './Pages/AuthPage/AuthPage'
import Register from './Pages/Register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyProfile from './Pages/MyProfile/MyProfile';
import React from 'react';
import pic1 from './assets/pic1.jpg';
import pic2 from './assets/pic2.jpg';
import pic3 from './assets/pic3.jpg';
import user_profile from './assets/user_profile_pic.jpg';



function App() {

  return (

    <>
      <Routes>
        <Route path='/myFeed' element={<Feed />} />
        <Route path='/' element={<AuthPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myProfile/:userId' element={<MyProfile/>}/>
        <Route path='*' element={<Navigate to="/login" />} />

      </Routes>
    </>
  )

}
export default App;
