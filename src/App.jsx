// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import TriviaList from './pages/TriviaList/TriviaList'
import NewTrivia from './pages/NewTrivia/NewTrivia'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'
import * as profileService from './services/profileService'
import * as triviaService from './services/triviaService'

// styles
import './App.css'

function App() {
  const [user, setUser] = useState(authService.getUser())
  const [trivias, setTrivias] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchAllTrivia = async () => {
      const data = await triviaService.indexTrivia()
      setTrivias(data)
    }
    if (user) fetchAllTrivia()
  }, [user])

  const handleLogout = () => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = () => {
    setUser(authService.getUser())
  }

  const handleAddTrivia = async (triviaFormData) => {
    console.log(trivias)
    const newTrivia = await triviaService.create(triviaFormData)
    setTrivias([newTrivia, ...trivias])
    navigate('/trivia')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/triviaList'
          element={
            <ProtectedRoute user={user}>
              <TriviaList />
            </ProtectedRoute>
          }
        />
        <Route 
          path='/trivia/new'
          element={
            <ProtectedRoute user={user}>
              <NewTrivia handleAddTrivia={handleAddTrivia}/>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  )
}

export default App
