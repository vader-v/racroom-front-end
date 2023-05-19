// npm modules
import { useState, useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import ProfileList from './pages/Profiles/ProfileList'
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
import * as triviaService from './services/triviaService'

// styles
import './App.css'
import Profiles from './pages/Profiles/Profiles'

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
    const newTrivia = await triviaService.create(triviaFormData)
    setTrivias([newTrivia, ...trivias])
    navigate('/trivia')
  }

  const handleUpdateTrivia = async (triviaFormData) => {
    const updatedTrivia = await triviaService.updateTrivia(triviaFormData)
    setTrivias(trivias.map((b) => triviaFormData._id === b._id ? updatedTrivia : b))
    navigate('/trivia')
  }

  const handleDeleteTrivia = async (triviaId) => {
    const deletedTrivia = await triviaService.deleteTrivia(triviaId)
    setTrivias(trivias.filter(b => b._id !== deletedTrivia._id))
    navigate('/trivia')
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profileList"
          element={
            <ProtectedRoute user={user}>
              <ProfileList />
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
          path='/trivia'
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
          path='/trivia/:triviaId'
          element={
            <ProtectedRoute user={user}>
              <TriviaDetails 
                user={user} 
                handleDeleteTrivia={handleDeleteTrivia}
              />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/trivia/:triviaId/edit" 
          element={
            <ProtectedRoute user={user}>
              <EditTrivia handleUpdateTrivia={handleUpdateTrivia} />
            </ProtectedRoute>
          } 
        />
        <Route
          path="/profiles/:profileId"
          element={
            <ProtectedRoute user={user}>
              <Profiles user={user} handleDeleteTrivia={handleDeleteTrivia}/>
            </ProtectedRoute>
          } 
        />
      </Routes>
    </>
  )
}

export default App
