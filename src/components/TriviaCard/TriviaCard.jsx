// npm modules
import { Link } from "react-router-dom"

// components
import OwnerInfo from '../OwnerInfo/OwnerInfo'

// css
import styles from './TriviaCard.module.css'

const TriviaCard = ({ trivia }) => {
  return (
    <>
      <Link to={`/trivia/${trivia._id}`} state={trivia}>
        <article className={styles.container}>
          <header>
            <span>
              <h1>{trivia.title}</h1>
            </span>
            <OwnerInfo content={trivia} />
            <h6>Category:</h6>
            <h4>{trivia.category}</h4>
          </header>
        </article>
      </Link>
    </>
  )
}

export default TriviaCard