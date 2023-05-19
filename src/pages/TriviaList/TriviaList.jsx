import { useState } from 'react'

import TriviaCard from '../../components/TriviaCard/TriviaCard'
import CategoryDropdown from '../../components/CategoryDropdown/CategoryDropdown'
import { TriviaSearchForm } from '../../components/SearchForm/SearchForm'

import styles from './TriviaList.module.css'

const TriviaList = (props) => {
  const [selectedCategory, setSelectedCategory] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

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
      <div className={styles.wrapper}>
        <div className={styles.searchBar}>
          <label htmlFor='title-search'>Search by title:</label>
          <TriviaSearchForm handleTriviaSearch={handleSearch} />
        </div>
        <div className={styles.dropdown}>
          <label htmlFor="category-filter">Filter by category:</label>
          <CategoryDropdown value={selectedCategory} onChange={handleCategoryChange} />
        </div>
      </div>
      <div className={styles.triviaList}>
        {filteredTrivias.map((trivia) => (
          <TriviaCard key={trivia._id} trivia={trivia} />
        ))}
      </div>
    </main>
  )
}

export default TriviaList
