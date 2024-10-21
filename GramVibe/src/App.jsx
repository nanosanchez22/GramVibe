import './App.css'
import AuthPage from './Pages/AuthPage/AuthPage'
import Register from './Pages/Register/Register';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {

  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<AuthPage />} />
        <Route path='/register' element={<Register />} />
      </Routes>
      </BrowserRouter>
    </div>
  )

}
export default App
