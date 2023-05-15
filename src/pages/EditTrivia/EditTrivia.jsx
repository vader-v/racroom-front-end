// npm modules
import { useState } from "react"
import { useLocation } from "react-router-dom"

//css
import styles from './EditTrivia.module.css'

const EditTrivia = (props) => {
  const { state } = useLocation()
  const [formData, setFormData] = useState(state)

  console.log(state)
  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleCheckbox = (e) => {
    setFormData({ ...formData, [e.target.name]: !!e.target.checked})
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleUpdateTrivia(formData)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
				<label htmlFor="title-input">
          Title
        </label>
				<input
          type="text" 
          name="title"
          id="title-input"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <label htmlFor="category-input">
          Category
        </label>
        <select 
          name="category" 
          id="category-input" 
          value={formData.category}
          onChange={handleChange}
        >
            <option value="Keyboard Shortcuts">Keyboard Shortcuts</option>
            <option value="Programming">Programming</option>
            <option value="Pop-Culture">Pop Culture</option>
            <option value="History">History</option>
            <option value="Games">Games</option>
            <option value="Languages">Languages</option>
            <option value="Television">Television</option>
        </select>
        <label htmlFor="question-input">
          Question
        </label>
        <textarea
          required
          type="text"
          name="question"
          id="text-input"
          value={formData.question}
          placeholder={formData.questions[0].text}
          onChange={handleChange}
        >
        </textarea>
        {formData.questions[0].choices.map((choice, index) => (
          formData.questions[0].choices[index] && (
            <div key={index}>
              <label 
                htmlFor={`answer${index + 1}-input`}>Answer {index + 1}
              </label>
              <input 
                required
                type="text"
                name={`answer${index + 1}`}
                value={formData[`answer${index + 1}`]}
                placeholder={choice.text}
                onChange={handleChange}
              />
            </div>
          )
        ))}
        <button type="submit">
          Submit
        </button>
      </form>
    </main>
  )
}

export default EditTrivia