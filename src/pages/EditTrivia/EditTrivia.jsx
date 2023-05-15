// npm modules
import { useState } from "react"
import { useLocation } from "react-router-dom"

//css
import styles from './EditTrivia.module.css'

const EditTrivia = ({handleUpdateTrivia}) => {
  const { state } = useLocation()
  const [triviaFormData, setTriviaFormData] = useState(state)

  const handleSaveTrivia = (evt) => {
    evt.preventDefault()
    const triviaData = {...triviaFormData}
    handleUpdateTrivia(triviaData)
  }

  const handleQuestionChange = (index, question) => {
    const updatedQuestions = [...triviaFormData.questions]
    updatedQuestions[index] = question
    setTriviaFormData({ ...triviaFormData, questions: updatedQuestions })
  }

  const handleAddQuestion = () => {
    setTriviaFormData({
      ...triviaFormData,
      questions: [...triviaFormData.questions, { text: '', choices: [] }],
    })
  }

  return (
    <main>
      <form onSubmit={handleSaveTrivia}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={triviaFormData.title}
        onChange={(e) =>
          setTriviaFormData({
            ...triviaFormData,
            title: e.target.value,
          })
        }
        />
        <label htmlFor="category-input">Category</label>
        <select 
          name="category" 
          id="category-input" 
          value={triviaFormData.category}
          onChange={(e) =>
            setTriviaFormData({
              ...triviaFormData,
              category: e.target.value,
            })
          }
          >
            <option value="Keyboard Shortcuts">Keyboard Shortcuts</option>
            <option value="Programming">Programming</option>
            <option value="Pop culture">Pop Culture</option>
            <option value="History">History</option>
            <option value="Games">Games</option>
            <option value="Languages">Languages</option>
            <option value="Television">Television</option>
        </select>
      {triviaFormData.questions.map((question, index) => (
        <div key={index}>
          <label htmlFor={`question-${index}`}>Question:</label>
          <input
            type="text"
            id={`question-${index}`}
            value={question.text}
            onChange={(e) =>
              handleQuestionChange(index, {
                ...question,
                text: e.target.value,
              })
            }
            />
          {question.choices.map((choice, choiceIndex) => (
            <div key={choiceIndex}>
              <label htmlFor={`choice-${index}-${choiceIndex}`}>
                Choice {choiceIndex + 1}:
              </label>
              <input
                type="text"
                id={`choice-${index}-${choiceIndex}`}
                value={choice.text}
                onChange={(e) => {
                  const updatedQuestions = [...triviaFormData.questions]
                  updatedQuestions[index].choices[choiceIndex].text = e.target.value
                  setTriviaFormData({
                    ...triviaFormData, questions: updatedQuestions
                  })
                }}
              />
              <label htmlFor={`correct-answer-${index}-${choiceIndex}`}>
                Correct answer:
              </label>
              <input
                type="checkbox"
                id={`correct-answer-${index}-${choiceIndex}`}
                checked={
                  choice.answer ? "checked" : ""
                }
                onChange={(e) => {
                  const updatedQuestions = [...triviaFormData.questions]
                  updatedQuestions[index].correctAnswerIndex =
                  e.target.checked ? choiceIndex : 1
                  updatedQuestions[index].choices.map((choice, idx) => 
                    choice.answer = idx === (e.target.checked ? choiceIndex : 1)
                      ?  true : false )
                  setTriviaFormData({
                    ...triviaFormData,
                    questions: updatedQuestions,
                  })
                }}
                />
            </div>
          ))}
          <button
            type="button"
            onClick={() => {
              const updatedQuestions = [...triviaFormData.questions]
              updatedQuestions[index].choices.push({text: '', answer: false})
              setTriviaFormData({
                ...triviaFormData,
                questions: updatedQuestions,
              })
            }}
            >
            Add Choice
          </button>
        </div>
      ))}
      <button type="button" onClick={handleAddQuestion}>
        Add Question
      </button>
        <button type="submit">Submit</button>
      </form>
    </main>
  )
}

export default EditTrivia