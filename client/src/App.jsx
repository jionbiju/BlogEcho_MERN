import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import { ToastContainer } from 'react-toastify'
import Register from './pages/Register'
function App() {
  return (
    <div>
    <ToastContainer position='top-right'/>
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/Blogs/:id' element={<Blogs/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
    </Routes>
    </div>
    

  )
}

export default App
