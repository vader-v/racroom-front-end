// npm modules
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

// components
import OwnerInfo from "../../components/OwnerInfo/OwnerInfo"

// services
import * as triviaService from '../../services/triviaService'

// css
import styles from './TriviaDetails.module.css'

const TriviaDetails = (props) => {
  const { triviaId } = useParams()
  const [trivia, setTrivia] = useState(null)
  const [selectedChoices, setSelectedChoices] = useState({})

  useEffect(() => {
    const fetchTrivia = async () => {
      const data = await triviaService.showTrivia(triviaId)
      setTrivia(data)
      const initialChoices = data.questions.reduce((acc, _, idx) => {
        acc[idx] = null
        return acc
      }, {})
      setSelectedChoices(initialChoices)
    }
    fetchTrivia()
  }, [triviaId])

  const handleSelectChoice = (questionIndex, choiceIndex) => {
    setSelectedChoices(prev => ({
      ...prev,
      [questionIndex]: choiceIndex
    }))
  }

const handleSubmitAnswer = () => {
  console.log(selectedChoices)
}


  if (!trivia) return <h1>Loading</h1>

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{trivia.category.toUpperCase()}</h3>
          <h1>{trivia.title}</h1>
          {trivia.questions.map((question, questionIndex) => 
      <div className="question" key={questionIndex}> 
        <h3>{question.text}</h3>
        {question.choices.map((choice, choiceIndex) => 
          <p key={choiceIndex}>
            {choice.text}
            <input 
              type="checkbox" 
              checked={selectedChoices[questionIndex] === choiceIndex}
              onChange={() => handleSelectChoice(questionIndex, choiceIndex)}
            />
          </p> 
        )}
      </div> 
          )}
            <button onClick={handleSubmitAnswer}>Submit Answer</button>
          <span>
            <OwnerInfo content={trivia} />
            {trivia.owner._id === props.user.profile &&
              <>
                <Link to={`/trivia/${triviaId}/edit`} state={trivia}>
                  Edit
                </Link>
                <button onClick={() => props.handleDeleteTrivia(triviaId)}>
                  Delete
                </button>
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