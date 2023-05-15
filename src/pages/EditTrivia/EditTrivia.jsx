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
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleUpdateTrivia(formData)
  }

  return (
    <main>
      <form onSubmit={handleSubmit}>
				<label htmlFor="title-input">Title</label>
				<input
          type="text" 
          name="title"
          id="title-input"
          value={formData.title}
          placeholder="Title"
          onChange={handleChange}
        />
        <label htmlFor="category-input">Category</label>
        <select 
          name="category" 
          id="category-input" 
          value={formData.category}
          onChange={handleChange}
        >
            <option value="Keyboard Shortcuts">Keyboard Shortcuts</option>
            <option value="Programming">Programming</option>
            <option value="Pop-culture">Pop Culture</option>
            <option value="History">History</option>
            <option value="Games">Games</option>
            <option value="Languages">Languages</option>
            <option value="Television">Television</option>
        </select>
        <label htmlFor="question-input">Question</label>
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
        {formData.questions[0].choices[0] && (
          <div>
            <label htmlFor="answer1-input">Answer 1</label>
            <input 
              required
              type="text"
              name="answer1"
              value={formData.answer1}
              placeholder={formData.questions[0].choices[0].text}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.questions[0].choices[1] && (
          <div>
            <label htmlFor="answer2-input">Answer 2</label>
            <input 
              required
              type="text"
              name="answer2"
              value={formData.answer2}
              placeholder={formData.questions[0].choices[1].text}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.questions[0].choices[2] && (
          <div>
            <label htmlFor="answer3-input">Answer 3</label>
            <input 
              required
              type="text"
              name="answer3"
              value={formData.answer3}
              placeholder={formData.questions[0].choices[2].text}
              onChange={handleChange}
            />
          </div>
        )}
        {formData.questions[0].choices[3] && (
          <div>
            <label htmlFor="answer4-input">Answer 4</label>
            <input 
              required
              type="text"
              name="answer4"
              value={formData.answer4}
              placeholder={formData.questions[0].choices[3].text}
              onChange={handleChange}
            />
          </div>
        )}
        <button type="submit">submit</button>
      </form>
    </main>
  )
}
  export default EditTrivia