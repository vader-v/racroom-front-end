import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import './NavBar.css'
import raccoonIconImg from '/raccoonIcon.svg'
import raccoonIconImg2 from '/raccoonIcon2.svg'

const NavBar = ({ user, handleLogout }) => {
	const [isOpen, setIsOpen] = useState(false)
	const [photo, setPhoto] = useState(raccoonIconImg)


  const handleMouseOver = () => {
    setPhoto(raccoonIconImg2)
  }

  const handleMouseOut = () => {
    setPhoto(raccoonIconImg)
  }

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
						<li className="raccoonLi">
						<NavLink to="/" onClick={closeMenu}><img src={photo} alt="" className="raccoonImage" onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
						</NavLink>
						</li>
						<li>
							<NavLink to="/trivia" onClick={closeMenu}>Trivia</NavLink>
						</li>
						<li>
							<NavLink to="/trivia/new" onClick={closeMenu}>Create</NavLink>
						</li>
						<li>
							<NavLink to="/profileList" onClick={closeMenu}>Profiles</NavLink>
						</li>
						<li>
              <NavLink to={`/profiles/${user.profile}`} onClick={closeMenu}>
                My Profile
              </NavLink>
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
