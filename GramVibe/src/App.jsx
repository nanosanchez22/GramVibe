import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyProfile from './Pages/MyProfile/MyProfile';


function App() {


  return (
    <>
      <Routes>
        <Route path='/myProfile' element={<MyProfile/>}/>

      </Routes>
    </>
  )
}

export default App
