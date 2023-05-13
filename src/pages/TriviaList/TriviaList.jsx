// npm modules
import { useState, useEffect } from 'react'

// services
import * as triviaService from '../../services/triviaService'

//css
import styles from './TriviaList.module.css'

const TriviaList = () => {
  return (
    <main className={styles.container} >
      <h1>
        all the trivia
      </h1>
    </main>
  )
}

export default TriviaList