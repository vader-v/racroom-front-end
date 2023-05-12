import { useState } from "react"

const NewTrivia = () => {
  return (
    <main>
      <form>
        <label htmlFor="title-input">Title</label>
        <input 
          type="text" 
          name="title"
          id="title-input"
          value={formData.title}
          placeholder="Title"
        />
        <label htmlFor="category-input">Category</label>
        <select name="category" id="category-input" >
          <option value="shortcuts">Keyboard Shortcuts</option>
          <option value="programming">Programming</option>
          <option value="Pop-Culture">Pop Culture</option>
          <option value="History">History</option>
          <option value="Games">Games</option>
          <option value="Languages">Languages</option>
        </select>
        <label htmlFor="question-1-input">Question 1</label>
        <textarea
          required
          type="text"
          name="question-1"
          id="text-input"
          value={formData.text}
        >
        </textarea>
        <label htmlFor="answer-1-input">Answer 1</label>
        <input 
          required
          type="text"
          name="answer-1"
        />
        <label htmlFor="answer-1-input">Answer 2</label>
        <input 
          required
          type="text"
          name="answer-2"
        />
        <label htmlFor="answer--input">Answer 3</label>
        <input 
          required
          type="text"
          name="answer-3"
        />
        <label htmlFor="answer--input">Answer 4</label>
        <input 
          required
          type="text"
          name="answer-4"
        />
      </form>
    </main>
  )
}

export default NewTrivia