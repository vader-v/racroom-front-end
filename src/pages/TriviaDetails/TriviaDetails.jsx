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
  
    // Check if it's the last question
    if (currentQuestionIndex === trivia.questions.length - 1) {
      // Calculate the number of correct choices
      const correctChoices = trivia.questions.reduce((total, question, questionIndex) => {
        const selectedChoiceIndex = selectedChoices[questionIndex]
        const selectedChoice = question.choices[selectedChoiceIndex]
        if (selectedChoice && selectedChoice.answer === true) {
          return total + 1
        }
        return total
      }, 0)
  
      console.log(`Number of correct choices: ${correctChoices}`)
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
    }
  }
  

  if (!trivia) return <h1>Loading</h1>

  const currentQuestion = trivia.questions[currentQuestionIndex]
  const totalQuestions = trivia.questions.length
  const correctChoices = selectedChoices.reduce(
    (count, choiceIndex, questionIndex) => {
      const question = trivia.questions[questionIndex]
      const selectedChoice = question.choices[choiceIndex]
      if (selectedChoice && selectedChoice.answer) {
        return count + 1
      }
      return count
    }, 0)

  return (
    <main className={styles.container}>
      <article>
        <header>
          <h3>{trivia.category.toUpperCase()}</h3>
          <h1>{trivia.title}</h1>
          
          <h2>
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </h2>
          <h2>Correct Choices: {correctChoices}</h2>
          <div className="question" key={currentQuestionIndex}>
            <h3>{currentQuestion.text}</h3>
            {currentQuestion.choices.map((choice, choiceIndex) => (
              <p key={choiceIndex}>
                <input
                  type="checkbox"
                  className="checkbox"
                  checked={selectedChoices[currentQuestionIndex] === choiceIndex}
                  onChange={() => handleSelectChoice(currentQuestionIndex, choiceIndex)}
                  />
                  {choice.text}
              </p>
            ))}
          </div>
          <button onClick={handleSubmitAnswer}>Submit Answer</button>
          <span>
            <div className="profileImgage">
              <OwnerInfo content={trivia} />
            </div>
            {trivia.owner._id === props.user.profile && (
              <>
                <Link to={`/trivia/${triviaId}/edit`} state={trivia}>
                  Edit
                </Link>
                <button 
                className="deleteContent"
                onClick={() => props.handleDeleteTrivia(triviaId)}>
                  Delete
                </button>
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
