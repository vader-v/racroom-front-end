// npm modules
import { useState, useEffect } from 'react'

// services
import * as profileService from '../../services/profileService'
import { NavLink } from 'react-router-dom'

// components
import SearchForm from '../../components/SearchForm/SearchForm'

// css
import styles from './Profiles.module.css'

const Profiles = () => {
  const [profiles, setProfiles] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileData = await profileService.getAllProfiles()
      setProfiles(profileData)
      setSearchResults(profileData)
    }
    fetchProfiles()
  }, [])

  if (!profiles.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  
  const handleProfileSearch = formData => {
    const filteredProfileResults = profiles.filter(profile => (
      profile.name.toLowerCase().includes(formData.query.toLowerCase())
    ))
    setSearchResults(filteredProfileResults)
  }

  return (
    <main className={styles.container}>
      <h1>Hello. This is a list of all the profiles.</h1>
      <SearchForm handleProfileSearch={handleProfileSearch} />
      {<h2>{searchResults.length} results found</h2>}
      {searchResults.map(profile =>
        <div key={profile._id}>
          {profile.name}
        </div>
      )}
      <div className={styles.changePassword}>
        <NavLink to="/auth/change-password">Change Password</NavLink>
      </div>
    </main>
  )
}

export default Profiles
