// npm modules
import { useState } from 'react'

const ProfileSearchForm = (props) => {
  const [formData, setFormData] = useState({ query: '' })

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormData({ query: value });
    props.handleProfileSearch(value); // Custom callback for profile search
  }

  return (
    <form className="search-form">
      <input
        name="query"
        type="text"
        autoComplete="off"
        value={formData.query}
        placeholder="Search Profiles"
        onChange={handleChange}
      />
    </form>
  )
}


const TriviaSearchForm = (props) => {
  const [formData, setFormData] = useState({ query: '' })
  
  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormData({ query: value });
    props.handleTriviaSearch(value); // Custom callback for trivia search
  }

  return (
    <form className="search-form">
      <input
        name="query"
        type="text"
        autoComplete="off"
        value={formData.query}
        placeholder="Search Trivia"
        onChange={handleChange}
        />
    </form>
  )
}

export {
  ProfileSearchForm,
  TriviaSearchForm
} 