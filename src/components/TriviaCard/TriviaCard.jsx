// npm modules
import { Link } from "react-router-dom"

// components
import AuthorInfo from '../AuthorInfo/AuthorInfo'

// css
import styles from './TriviaCard.module.css'

const TriviaCard = ({ trivia }) => {
  return (
    <Link to={`/trivia/${trivia._id}`} state={trivia}>
      <article className={styles.container}>
        <header>
          <span>
            <h1>{trivia.title}</h1>
          </span>
          <AuthorInfo content={trivia}/>
        </header>
        <p>{trivia.tex}</p>
      </article>
    
    </Link>
  )
}

export default TriviaCard