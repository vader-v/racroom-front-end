import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import OwnerInfo from "../../components/OwnerInfo/OwnerInfo"
import * as triviaService from "../../services/triviaService"
import styles from "./TriviaDetails.module.css"
import mailBoxAnimation from '/mail-raccoon-animation.gif'
import mailBox from '/mail-box.gif'

const TriviaDetails = (props) => {
	const { triviaId } = useParams()
	const [trivia, setTrivia] = useState(null)
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
	const [selectedChoices, setSelectedChoices] = useState([])
	const [isChoiceSelected, setIsChoiceSelected] = useState(false)
	const [isTriviaFinished, setIsTriviaFinished] = useState(false)
	const [isHeaderVisible, setIsHeaderVisible] = useState(false)
	const [photo, setPhoto] = useState(mailBox)
	const [isMailboxClicked, setIsMailboxClicked] = useState(false) // new state

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
		setIsMailboxClicked(true)
		setPhoto(mailBoxAnimation)
		setTimeout(() => {
			setIsHeaderVisible(true)
		}, 5500)
	}

	const handleSubmitAnswer = () => {
		console.log(selectedChoices)

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
			console.log(`Number of correct choices: ${correctChoices}`)
			setIsTriviaFinished(true)
		} else {
			setCurrentQuestionIndex((prevIndex) => prevIndex + 1)
			setIsChoiceSelected(false)
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
		},
		0
	)

return (
	<main className={styles.container}>
		<article>
			<header>
      {!isHeaderVisible ? (
          <img 
            src={photo} 
            alt=""
            className={`${styles.mailbox} mailbox`}
            onClick={handleImageClick} 
          />
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
							<div>Correct Choices: {correctChoices} / {trivia.questions.length}</div>
						) : currentQuestionIndex === trivia.questions.length - 1 ? (
							<>
								<button disabled={!isChoiceSelected} onClick={handleSubmitAnswer}>
									Finish Trivia
								</button>
							</>
						) : (
							<button onClick={handleSubmitAnswer} disabled={!isChoiceSelected}>
								Next Question
							</button>
						)}
						<span>
							<div className="profileImgage">
								<OwnerInfo content={trivia} />
							</div>
							<Link to={'/trivia'}>Return</Link>
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
			<p>{trivia.text}</p>
		</article>
		<section>
			<h1>Comments</h1>
		</section>
	</main>
)
}

export default TriviaDetails
