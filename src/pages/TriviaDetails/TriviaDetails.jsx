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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedChoices, setSelectedChoices] = useState([])

  useEffect(() => {
    const fetchTrivia = async () => {
      const data = await triviaService.showTrivia(triviaId)
      setTrivia(data)
      setSelectedChoices(new Array(data.questions.length).fill(null))
    }

    fetchTrivia()
  }, [triviaId])

  const handleSelectChoice = (questionIndex, choiceIndex) => {
    setSelectedChoices((prevChoices) => {
      const updatedChoices = [...prevChoices]
      updatedChoices[questionIndex] = choiceIndex
      return updatedChoices
    })
  }

  const handleSubmitAnswer = () => {
    console.log(selectedChoices)
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
  }

  if (!trivia) return <h1>Loading</h1>

  const currentQuestion = trivia.questions[currentQuestionIndex]

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{trivia.category.toUpperCase()}</h3>
          <h1>{trivia.title}</h1>
          <div className="question" key={currentQuestionIndex}>
            <h3>{currentQuestion.text}</h3>
            {currentQuestion.choices.map((choice, choiceIndex) => (
              <p key={choiceIndex}>
                {choice.text}
                <input
                  type="checkbox"
                  checked={selectedChoices[currentQuestionIndex] === choiceIndex}
                  onChange={() => handleSelectChoice(currentQuestionIndex, choiceIndex)}
                />
              </p>
            ))}
          </div>
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
          <span>
            <OwnerInfo content={trivia} />
            {trivia.owner._id === props.user.profile && (
              <>
                <Link to={`/trivia/${triviaId}/edit`} state={trivia}>
                  Edit
                </Link>
                <button onClick={() => props.handleDeleteTrivia(triviaId)}>Delete</button>
              </>
            )}
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
