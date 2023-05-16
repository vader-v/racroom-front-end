// npm modules
import { useState } from 'react'

const SearchForm = (props) => {
  const [formData, setFormData] = useState({query: ''})

  const handleChange = evt => {
    setFormData({ ...formData, [evt.target.name]: evt.target.value })
    props.handleProfileSearch({ ...formData, [evt.target.name]: evt.target.value })
  }

  // const handleSubmit = evt => {
  //   evt.preventDefault()
  //   props.handleProfileSearch(formData)
  //   setFormData({query: ""})
  // }

  return (
    <form className="search-form" >
      <input
        name="query"
        type="text"
        autoComplete="off"
        value={formData.query}
        placeholder='search'
        onChange={handleChange}
      />
    </form>
  )
}

export default SearchForm