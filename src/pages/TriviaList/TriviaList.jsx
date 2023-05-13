// npm modules
import { useState, useEffect } from 'react'

// services
import * as triviaService from '../../services/triviaService'

//css
import styles from './TriviaList.module.css'
import TriviaCard from '../../components/TriviaCard/TriviaCard'

const TriviaList = (props) => {
  return (
    <main className={`${styles.container} ${styles.main}`} >
      {props.trivia.map(trivia => (
        <TriviaCard key={trivia._id} trivia={trivia}/>
      ))}
    </main>
  )
}

export default TriviaList