import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Login from './pages/Login'
import Join from './pages/Join'
import User from './pages/User'
import About from './pages/About'
import Admin from './pages/Admin'
import LoginContextProvider from './contexts/LoginContextProvider'
import ProtectedRoute from './components/common/ProtectedRoute'

function App() {
  return (
    <BrowserRouter>
      <LoginContextProvider>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/join' element={<Join />} />
          <Route
            path='/user'
            element={
              <ProtectedRoute>
                <User />
              </ProtectedRoute>
            }
          />
          <Route path='/about' element={<About />} />
          <Route
            path='/admin'
            element={
              <ProtectedRoute roles={['ROLE_ADMIN']}>
                <Admin />
              </ProtectedRoute>
            }
          />
        </Routes>
      </LoginContextProvider>
    </BrowserRouter>
  )
}

export default App
