// css
import styles from './Landing.module.css'

import { NavLink } from 'react-router-dom'

const Landing = ({ user }) => {
  return (
    <main className={styles.container}>
      <h1>hello, {user ? user.name : 'please '}
      {user ? null : <NavLink to="/auth/login">Log In</NavLink>}
      </h1>
    </main>
  )
}

export default Landing
