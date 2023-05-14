// npm modules
import { useState } from "react"
// css
import styles from './NewTrivia.module.css'
import OwnerInfo from "../../components/OwnerInfo/OwnerInfo";

const NewTrivia = ({ handleAddTrivia }) => {
  const [triviaFormData, setTriviaFormData] = useState({
    title: '',
    text: '',
    category: 'Keyboard Shortcuts',
    question: '',
    answer1: '', 
    answer2: '',
    answer3: '',
    answer4: '',
    checkbox1: false,
    checkbox2: false,
    checkbox3: false,
    checkbox4: false,
  })

  const handleSaveTrivia = (e) => {
    e.preventDefault();
    const triviaData = {
      ...triviaFormData,
    }
    handleAddTrivia(triviaData)
  };

  const handleCheckbox = (e) => {
    console.log(!!e.target.checked)
    setFormData({ ...formData, [e.target.name]: !!e.target.checked})
  };

  const handleSubmit = (evt) => {
    evt.preventDefault()
    props.handleAddTrivia(formData)
  }

  return (
    <main className={styles.container}>

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
          onChange={handleChange}
        >
        </textarea>
        <label htmlFor="answer1-input">Answer 1</label>
        <input 
          required
          type="text"
          name="answer1"
          value={formData.answer1}
          onChange={handleChange}
        />
        <input 
          type="checkbox" 
          name="checkbox1"
          onChange={handleCheckbox} />
        <label htmlFor="answer2-input">Answer 2</label>
        <input 
          required
          type="text"
          name="answer2"
          value={formData.answer2}
          onChange={handleChange}
        />
        <input 
          type="checkbox" 
          name="checkbox2"
          onChange={handleCheckbox} />
        <label htmlFor="answer3-input">Answer 3</label>
        <input 
          required
          type="text"
          name="answer3"
          value={formData.answer3}
          onChange={handleChange}
        />
        <input 
          type="checkbox" 
          name="checkbox3"
          onChange={handleCheckbox} />
        <label htmlFor="answer4-input">Answer 4</label>
        <input 
          required
          type="text"
          name="answer4"
          value={formData.answer4}
          onChange={handleChange}
        />
        <input 
          type="checkbox" 
          name="checkbox4"
          onChange={handleCheckbox} />
        <button type="submit">submit</button>
      </form>
      </main>
  );
};


export default NewTrivia