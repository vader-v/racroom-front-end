import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import * as profileService from '../../services/profileService'
import ProfileTriviaList from '../../components/ProfileTriviaList/ProfileTriviaList'

const Profiles = () => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState(null)

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getProfileById(profileId)
        setProfile(profileData)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [profileId])

  if (!profile) {
    return <div>Loading...</div>
  }
  if (!profile.trivia) {
    return <div>Loading...</div>
  }

  const profileTrivias = profile?.trivias || []

  return (
    <div>
      <h2>Profile Details</h2>
      <h3>Name: {profile.name}</h3>
      <img src={profile.photo} alt="Profile" />
      {/* Display the trivias associated with the profile */}
      <ProfileTriviaList profileTrivias={profileTrivias} />
    </div>
  )
}

export default Profiles
