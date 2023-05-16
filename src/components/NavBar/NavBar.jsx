import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'

const NavBar = ({ user, handleLogout }) => {
	const [isOpen, setIsOpen] = useState(false)

	const toggleMenu = () => {
		setIsOpen(!isOpen)
	}

	const closeMenu = () => {
		setIsOpen(false)
	}

	return (
		<nav>
			<div onClick={toggleMenu} className="hamburger-icon">
				&#9776;
			</div>
			<ul className={`nav-links ${isOpen ? 'open' : ''}`}>
      <div onClick={closeMenu} className={`hamburger-icon ${isOpen ? 'inside' : ''}`}>
          &#9776;
        </div>
				{user ? (
					<>
						<li>Welcome, {user.name}</li>
						<li>
							<NavLink to="/trivia" onClick={closeMenu}>Trivia</NavLink>
						</li>
						<li>
							<NavLink to="/trivia/new" onClick={closeMenu}>Create</NavLink>
						</li>
						<li>
							<NavLink to="/profiles" onClick={closeMenu}>Profiles</NavLink>
						</li>
						<li>
							<NavLink to="" onClick={(event) => {handleLogout(event); closeMenu();}}>LOG OUT</NavLink>
						</li>
					</>
				) : (
					<>
						<li>
							<NavLink to="/auth/login" onClick={closeMenu}>Log In</NavLink>
						</li>
						<li>
							<NavLink to="/auth/signup" onClick={closeMenu}>Sign Up</NavLink>
						</li>
					</>
				)}
			</ul>
		</nav>
	)
}

export default NavBar
