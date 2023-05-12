import { useState } from "react"

const NewTrivia = () => {
  const [formData, setFormData ] = useState({
    title: '',
    text: '',
    category: 'shortcuts'
  })

  const handleChange = (evt) => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    // Update this line shortly...
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
            <option value="shortcuts">Keyboard Shortcuts</option>
            <option value="programming">Programming</option>
            <option value="pop-culture">Pop Culture</option>
            <option value="history">History</option>
            <option value="games">Games</option>
            <option value="languages">Languages</option>
        </select>
        <label htmlFor="question-1-input">Question 1</label>
        <textarea
          required
          type="text"
          name="question-1"
          id="text-input"
          value={formData.text}
          onChange={handleChange}
        >
        </textarea>
        <label htmlFor="answer-1-input">Answer 1</label>
        <input 
          required
          type="text"
          name="answer-1"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="answer-1-input">Answer 2</label>
        <input 
          required
          type="text"
          name="answer-2"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="answer--input">Answer 3</label>
        <input 
          required
          type="text"
          name="answer-3"
          value={formData.text}
          onChange={handleChange}
        />
        <label htmlFor="answer--input">Answer 4</label>
        <input 
          required
          type="text"
          name="answer-4"
          value={formData.text}
          onChange={handleChange}
        />
        <button type="submit">submit</button>
      </form>
    </main>
  )
}

export default NewTrivia