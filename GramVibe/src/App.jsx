import './App.css'
import Feed from './Pages/MyFeed/MyFeed/'; 
import AuthPage from './Pages/AuthPage/AuthPage'
import Register from './Pages/Register/Register';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MyProfile from './Pages/MyProfile/MyProfile';
import React from 'react';
import UserProfile from './Pages/UserProfile/UserProfile';



function App() {

  return (

    <>
      <Routes>
        <Route path='/myFeed' element={<Feed />} />
        <Route path='/login' element={<AuthPage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/myProfile/:userId' element={<MyProfile/>}/>
        <Route path='/profile/:userId' element={<UserProfile/>}/>
        <Route path='*' element={<Navigate to="/login" />} />

      </Routes>
    </>
  )

}
export default App;
