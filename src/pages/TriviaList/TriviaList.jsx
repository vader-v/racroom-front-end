// npm modules
import { useState } from 'react'

// components
import TriviaCard from '../../components/TriviaCard/TriviaCard'
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown'
import { TriviaSearchForm } from '../../components/SearchForm/SearchForm'

// css
import styles from './TriviaList.module.css'

const TriviaList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState("")
  const [searchQuery, setSearchQuery] = useState("")

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value)
  }

  const handleSearch = (query) => {
    setSearchQuery(query.toLowerCase())
  }

  const filterTrivias = (trivia) => {
    if (selectedCategory && trivia.category !== selectedCategory) {
      return false
    }
    if (searchQuery && !trivia.title.toLowerCase().includes(searchQuery)) {
      return false
    }
    return true
  }

  const filteredTrivias = props.trivias.filter(filterTrivias)

  return (
    <main className={styles.container}>
  <div className={styles.filters}>
    <div className={styles.filter}>
      <label htmlFor="category-filter">Filter by category:</label>
      <CategoryDropdown value={selectedCategory} onChange={handleCategoryChange} />
    </div>
    <div className={styles.filter}>
      <label htmlFor="title-search">Search by title:</label>
      <TriviaSearchForm handleTriviaSearch={handleSearch} />
    </div>
  </div>
  {filteredTrivias.map((trivia) => (
    <TriviaCard key={trivia._id} trivia={trivia} />
  ))}
</main>
  )
}

export default TriviaList
