// npm modules
import { useState, useEffect } from "react"
import { useParams, Link, NavLink } from "react-router-dom"
import Confetti from "react-dom-confetti"

// components
import OwnerInfo from "../../components/OwnerInfo/OwnerInfo"
import mailBoxAnimation from "/mail-raccoon-animation.gif"
import tree from "/racroom-tree-cutout.png"
import mailBox from "/mail-box.gif"
import drumSound from "/drum-roll.mp3"
import winSound from "/end-trivia.mp3"
import trashCan from "/trash-animation.gif"
import trashRaccoon from "/trashcan-animation.svg"
import trashStuborn from "/trashcan-stuborn.gif"

// services
import * as triviaService from "../../services/triviaService"

// css
import styles from "./TriviaDetails.module.css"

const config = {
  angle: 90,
  spread: 360,
  startVelocity: 20,
  elementCount: 70,
  dragFriction: 0.12,
  duration: 3000,
  stagger: 3,
  width: "10px",
  height: "10px",
  perspective: "500px",
  colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
}

const TriviaDetails = (props) => {
  const { triviaId } = useParams()
  const [trivia, setTrivia] = useState(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedChoices, setSelectedChoices] = useState([])
  const [isChoiceSelected, setIsChoiceSelected] = useState(false)
  const [isTriviaFinished, setIsTriviaFinished] = useState(false)
  const [isHeaderVisible, setIsHeaderVisible] = useState(false)
  const [photo, setPhoto] = useState(mailBox)
  const [isMailboxClicked, setIsMailboxClicked] = useState(false)
  const [doesScoreExist, setScoreExists] = useState(false)
  const [scoreId, setScoreId] = useState("")
  const [latestScore, setLatestScore] = useState(0)
  const [score, setScore] = useState(0)
  const audioClip = new Audio(drumSound)
  audioClip.volume = 0.2
  const audioClip2 = new Audio(winSound)
  audioClip2.volume = 0.3
  const [confettiTrigger, setConfettiTrigger] = useState(false)
  const [showLatestScore, setShowLatestScore] = useState(false)
  const [isStubbornTrashVisible, setIsStubbornTrashVisible] = useState(false)

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
    setIsChoiceSelected(true)
  }

  const handleImageClick = () => {
    if (isMailboxClicked) {
      setIsHeaderVisible(true)
    } else {
      audioClip.play()
      setIsMailboxClicked(true)
      setPhoto(mailBoxAnimation)
      setTimeout(() => {
        setIsHeaderVisible(true)
      }, 4500)
    }
  }

  const handleTrashClick = () => {
    setIsStubbornTrashVisible(true)
    setTimeout(() => setIsStubbornTrashVisible(false), 1000)
  }

  const handleAddScore = async (scoreData) => {
    const newScore = await triviaService.addScore(triviaId, scoreData)
    setTrivia({ ...trivia, scores: [...trivia.scores, newScore] })
  }

  const handleUpdateScore = async (scoreData) => {
    await triviaService.updateScore(triviaId, scoreId, scoreData)
  }

  const handleSubmitAnswer = () => {
    if (currentQuestionIndex === trivia.questions.length - 1) {
      const correctChoices = trivia.questions.reduce(
        (total, question, questionIndex) => {
          const selectedChoiceIndex = selectedChoices[questionIndex]
          const selectedChoice = question.choices[selectedChoiceIndex]
          if (selectedChoice && selectedChoice.answer === true) {
            return total + 1
          }
          return total
        },
        0
      )
      setScore(correctChoices)
      setIsTriviaFinished(true)
      setShowLatestScore(true)
      if (!doesScoreExist) {
        handleAddScore({ score: correctChoices })
      } else {
        handleUpdateScore({ score: correctChoices })
      }
      setTimeout(() => {
        audioClip2.play()
        setConfettiTrigger(true)
      }, 600)
    } else {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
      setIsChoiceSelected(false)
    }
  }

  useEffect(() => {
    if (trivia) {
      const newScoreList = trivia.scores.filter(
        (scoreData) => scoreData.owner._id == props.user.profile
      )
      if (newScoreList.length) {
        const currentScoreId = newScoreList[0]._id
        setScoreExists(true)
        setScoreId(currentScoreId)
        setLatestScore(newScoreList[0].score)
      }
    }
  }, [trivia])

  useEffect(() => {
    setLatestScore(score)
  }, [isTriviaFinished])

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
    },
    0
  )

  return (
    <main className={styles.container}>
      <Confetti active={confettiTrigger} config={config} />
      <article className={styles.article}>
        <header>
          {showLatestScore && (
            <div className={styles.latestScore}>Your Score: {latestScore}</div>
          )}
          <Confetti active={confettiTrigger} config={config} />
          {!isHeaderVisible ? (
            <>
              <h1 className={styles.title}>{trivia.title}</h1>
              <img
                src={photo}
                alt=""
                className={`${styles.mailbox} mailbox`}
                onClick={handleImageClick}
              />
              <img src={tree} alt="" className={`${styles.tree} tree`} />
              <img src={tree} alt="" className={`${styles.tree2} tree2`} />
            </>
          ) : (
            <>
              <h3>{trivia.category.toUpperCase()}</h3>
              <h2>
                Question {currentQuestionIndex + 1} of {totalQuestions}
              </h2>
              <h1>{trivia.title}</h1>
              <div className="question" key={currentQuestionIndex}>
                <h3>{currentQuestion.text}</h3>
                {currentQuestion.choices.map((choice, choiceIndex) => (
                  <p key={choiceIndex}>
                    <input
                      type="checkbox"
                      className="checkbox"
                      checked={
                        selectedChoices[currentQuestionIndex] === choiceIndex
                      }
                      onChange={() =>
                        handleSelectChoice(currentQuestionIndex, choiceIndex)
                      }
                      required
                    />
                    {choice.text}
                  </p>
                ))}
              </div>
              {isTriviaFinished ? (
                <div className="correctChoices">
                  Correct Choices: {correctChoices} / {trivia.questions.length}
                </div>
              ) : currentQuestionIndex === trivia.questions.length - 1 ? (
                <>
                  <button
                    disabled={!isChoiceSelected}
                    onClick={handleSubmitAnswer}
                  >
                    Finish Trivia
                  </button>
                </>
              ) : (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={!isChoiceSelected}
                >
                  Next Question
                </button>
              )}
              {doesScoreExist && (
                <h5>
                  {!isTriviaFinished ? "Previous" : "New"} Score: {latestScore}
                </h5>
              )}
              <span>
                <div className="profileImgage">
                  <OwnerInfo content={trivia} />
                </div>
                <Link to={"/trivia"}>Return</Link>
                {trivia.owner._id === props.user.profile && (
                  <>
                    <Link to={`/trivia/${triviaId}/edit`} state={trivia}>
                      Edit
                    </Link>
                    <button
                      className="deleteContent"
                      onClick={() => props.handleDeleteTrivia(triviaId)}
                    >
                      Delete
                    </button>
                  </>
                )}
              </span>
            </>
          )}
        </header>
        {isHeaderVisible &&
          (isTriviaFinished ? (
            <NavLink to="/trivia">
              <img
                src={trashCan}
                alt="Trash Raccoon"
                className={styles.trashImage}
              />
            </NavLink>
          ) : (
            <>
              <img
                src={isStubbornTrashVisible ? trashStuborn : trashRaccoon}
                alt="Trash Can"
                className={styles.trashImage}
                onClick={handleTrashClick}
              />
            </>
          ))}
      </article>
    </main>
  )
}

export default TriviaDetails
