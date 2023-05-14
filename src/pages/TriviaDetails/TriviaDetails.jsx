// npm modules
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

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

  if (!trivia) return <h1>Loading</h1>

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{trivia.category.toUpperCase()}</h3>
          <h1>{trivia.title}</h1>
          <span>
            <AuthorInfo content={trivia} />
            {trivia.author._id === props.user.profile &&
              <>
                <Link to={`/trivia/${triviaId}/edit`} state={trivia}>Edit</Link>
                <button>Delete</button>
              </>
            }
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