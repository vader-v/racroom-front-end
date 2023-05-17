import { useState } from 'react';
import styles from './Landing.module.css'
import { NavLink } from 'react-router-dom'
import raccoonImg2 from '/raccoonAnimation1.svg'
import raccoonImg from '/raccoonAnimation2.svg'

const Landing = ({ user }) => {
  const [photo, setPhoto] = useState(raccoonImg)

  const handleMouseOver = () => {
    setPhoto(raccoonImg2)
  }

  const handleMouseOut = () => {
    setPhoto(raccoonImg)
  }

  return (
    <div className={styles.pageContainer}>
      <main className={styles.container}>
        <NavLink to="/trivia">
          <img src={photo} alt="" className={styles.icon} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
        </NavLink>
        <h1>hello, {user ? user.name : 'please '}
        {user ? null : <NavLink to="/auth/login">Log In</NavLink>}
        </h1>
      </main>
    </div>
  )
}

export default Landing