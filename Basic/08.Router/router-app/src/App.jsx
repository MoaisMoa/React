import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Board from './pages/Board'
import Login from './pages/Login'
import Admin from './pages/Admin'
import About from './pages/About'
import Home from './pages/Home'
import { useState } from 'react'

function App() {
  //State
  const [isLogin, setIsLogin] = useState(true)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/boards/:id' element={<Board />} />
        <Route path='/login' element={<Login />} />
        <Route path='/admin' element={isLogin ? <Admin /> : <Navigate to="/login"/> } />
      </Routes>
    </BrowserRouter>
  )
}

export default App
