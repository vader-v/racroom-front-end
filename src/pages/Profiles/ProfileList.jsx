// npm modules
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// services
import * as profileService from '../../services/profileService'
import { NavLink } from 'react-router-dom'

// components
import SearchForm from '../../components/SearchForm/SearchForm'

// css
import styles from './Profiles.module.css'

const ProfileList = () => {
  const [profileList, setProfileList] = useState([])
  const [searchResults, setSearchResults] = useState([])

  useEffect(() => {
    const fetchProfiles = async () => {
      const profileListData = await profileService.getAllProfiles()
      setProfileList(profileListData)
      setSearchResults(profileListData)
    }
    fetchProfiles()
  }, [])

  if (!profileList.length) {
    return <main className={styles.container}><h1>Loading...</h1></main>
  }
  
  const handleProfileSearch = formData => {
    const filteredProfileResults = profileList.filter(profile => (
      profile.name.toLowerCase().includes(formData.query.toLowerCase())
    ))
    setSearchResults(filteredProfileResults)
  }

  return (
    <main className={styles.container}>
      <div className='stationary-search-bar'>
        <h1>Hello. This is a list of all the profiles.</h1>
        <SearchForm handleProfileSearch={handleProfileSearch} />
        {<h2>{searchResults.length} results found</h2>}
      </div>
      <div className='profiles-name-search-list'>
        {searchResults.map(profile =>
          <Link to={`/profiles/${profile._id}`} key={profile._id} className='profile-names'>
            {profile.name}
          </Link>
        )}
      </div>
      <div className={styles.changePassword}>
        <NavLink to="/auth/change-password">Change Password</NavLink>
      </div>
    </main>
  )
}

export default ProfileList
