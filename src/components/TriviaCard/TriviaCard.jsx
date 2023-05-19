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
      <Link to={`/trivia/${trivia._id}`} state={trivia}>
          <header>
            <span>
              <h1>{trivia.title}</h1>
            </span>
            <OwnerInfo content={trivia} />
            <h6>Category:</h6>
            <h4>{trivia.category}</h4>
          </header>
      </Link>
        </article>
    </>
  )
}

export default TriviaCard