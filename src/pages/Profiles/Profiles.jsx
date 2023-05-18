import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as profileService from "../../services/profileService"
import * as triviaService from "../../services/triviaService"
const Profiles = () => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState(null)
  const [triviaDetails, setTriviaDetails] = useState([])

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getProfileById(profileId)
        setProfile(profileData)
        if (profileData && profileData.trivia) {
          // Fetch the details of each trivia based on their IDs
          const fetchTriviaDetails = async () => {
            const promises = profileData.trivia.map(async (triviaId) => {
              const triviaData = await triviaService.getTriviaById(triviaId)
              return triviaData
            })
            const triviaDetailsData = await Promise.all(promises)
            setTriviaDetails(triviaDetailsData)
          }

          fetchTriviaDetails()
        }
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
  }, [profileId])

  if (!profile) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>Profile Details</h2>
      <h3>Name: {profile.name}</h3>
      <img src={profile.photo} alt="Profile" />
      {/* Display the trivias associated with the profile */}
      {triviaDetails.length > 0 ? (
        <div>
          <h3>Trivias:</h3>
          <ul>
            {triviaDetails.map((trivia) => {
              console.log(trivia) // Check the trivia object in the console
              if (!trivia._id) {
                console.log("Invalid trivia data:", trivia)
                return null
              }
              return (
                <li key={trivia._id}>
                  <Link to={`/trivia/${trivia._id}`}>{trivia.title}</Link>
                </li>
              )
            })}
          </ul>
        </div>
      ) : (
        <div>No trivias found.</div>
      )}
    </div>
  )
}

export default Profiles
