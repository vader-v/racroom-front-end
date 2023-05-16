import React, { useState } from 'react';
import styles from './Landing.module.css'
import { NavLink } from 'react-router-dom'
import raccoonImg from '/raccoon-1.svg'
import raccoonImg2 from '/raccoon-2.svg'

const Landing = ({ user }) => {
  const [photo, setPhoto] = useState(raccoonImg);

  const handleMouseOver = () => {
    setPhoto(raccoonImg2);
  };

  const handleMouseOut = () => {
    setPhoto(raccoonImg);
  };

  return (
    <div className={styles.pageContainer}>
      <main className={styles.container}>
        <img src={photo} alt="" className={styles.icon} onMouseOver={handleMouseOver} onMouseOut={handleMouseOut} />
        <h1>hello, {user ? user.name : 'please '}
        {user ? null : <NavLink to="/auth/login">Log In</NavLink>}
        </h1>
      </main>
    </div>
  )
}

export default Landing
