// npm modules
import { Link } from "react-router-dom"

// components
import OwnerInfo from '../OwnerInfo/OwnerInfo'

// css
import styles from './TriviaCard.module.css'

const TriviaCard = ({ trivia }) => {
  return (
    <>
      <article className={styles.container}>
        <header>
          <Link to={`/trivia/${trivia._id}`} state={trivia}>
          <span>
            <h1>{trivia.title}</h1>
          </span>
          <OwnerInfo content={trivia}/>
          </Link>
          <h6>Category:</h6>
        <h4>{trivia.category}</h4>
        </header>
      </article>
    </>
  )
}

export default TriviaCard