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
import TriviaDetails from './pages/TriviaDetails/TriviaDetails'
import EditTrivia from './pages/EditTrivia/EditTrivia'

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
      console.log("DATAAAA",data)
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

  const handleUpdateTrivia = async (triviaFormData) => {
    const updatedTrivia = await triviaService.update(triviaFormData)
    setTrivias(trivias.map((b) => triviaFormData._id === b._id ? updatedTrivia : b))
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
              <TriviaList trivias={trivias} />
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
        <Route 
          path='/trivia/:trivaId'
          element={
            <ProtectedRoute user={user}>
              <TriviaDetails user={user}/>
            </ProtectedRoute>
          }/>
        <Route 
          path="/trivia/:triviaId/edit" 
          element={
            <ProtectedRoute user={user}>
              <EditTrivia handleUpdateTrivia={handleUpdateTrivia} />
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
