// npm modules
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

// components
import AuthorInfo from "../../components/AuthorInfo/AuthorInfo"

// services
import * as triviaService from '../../services/triviaService'

// css
import styles from './TriviaDetails.module.css'

const TriviaDetails = (props) => {
  const { triviaId } = useParams()
  const [trivia, setTrivia] = useState(null)

  useEffect(() => {
    const fetchTrivia =async () => {
      const data = await triviaService.show(triviaId)
      setTrivia(data)
    }
    fetchTrivia()
  }, [triviaId])

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{trivia.category.toUpperCase()}</h3>
          <h1>{trivia.title}</h1>
          <span>
            <AuthorInfo content={trivia} />
          </span>
        </header>
        <p>{trivia.text}</p>
      </article>
      <section>
        <h1>Comments</h1>
      </section>
    </main>
  )
}

export default TriviaDetails