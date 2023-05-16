import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  return (
    <nav>
      <div onClick={toggleMenu} className="hamburger-icon">
        &#9776; {/* This is a simple hamburger icon */}
      </div>
      <ul className={`nav-links ${isOpen ? 'open' : ''}`}>
        {user ? (
          <>
            <li>Welcome, {user.name}</li>
            <li><NavLink to="/profiles">Profiles</NavLink></li>
            <li><NavLink to="/trivia">All Trivia</NavLink></li>
            <li><NavLink to="/trivia/new">Create</NavLink></li>
            <li><NavLink to="" onClick={handleLogout}>LOG OUT</NavLink></li>
          </>
        ) : (
          <>
            <li><NavLink to="/auth/login">Log In</NavLink></li>
            <li><NavLink to="/auth/signup">Sign Up</NavLink></li>
          </>
        )}
      </ul>
    </nav>
  )
}

export default NavBar
