import { Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Blogs from './pages/Blogs'
import Login from './pages/Login'
import Register from './pages/Register'
import CreatePost from './pages/CreatePost'
import Profile from './pages/Profile'
import EditPost from './pages/EditPost'
import ProtectedRoute from './components/ProtectedRoute'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div>
      <ToastContainer position='top-right' />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/Blogs/:id' element={<Blogs />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route
          path='/createpost'
          element={
            <ProtectedRoute>
              <CreatePost />
            </ProtectedRoute>
          }
        />
        <Route
          path='/edit/:id'
          element={
            <ProtectedRoute>
              <EditPost />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  )
}

export default App
