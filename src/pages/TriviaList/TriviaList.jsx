// components
import { useState } from 'react'
import TriviaCard from '../../components/TriviaCard/TriviaCard'
 
//css
import styles from './TriviaList.module.css'
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown'


const TriviaList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("")

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const filteredTrivias = selectedCategory
    ? props.trivias.filter((trivia) => trivia.category === selectedCategory)
    : props.trivias
  return (
    <main className={styles.container}>
      <div>
        <label htmlFor="category-filter">Filter by Category:</label>
        <CategoryDropdown value={selectedCategory} onChange={handleCategoryChange} />
      </div>

      {filteredTrivias.map((trivia) => (
        <TriviaCard key={trivia._id} trivia={trivia} />
      ))}
    </main>
  )
}

export default TriviaList