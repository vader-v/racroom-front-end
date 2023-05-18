import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import * as profileService from "../../services/profileService"
import * as triviaService from "../../services/triviaService"
import * as authService from "../../services/authService"

const Profiles = (props) => {
  const { profileId } = useParams()
  const [profile, setProfile] = useState(null)
  const [triviaDetails, setTriviaDetails] = useState([])
  const [loggedInUser, setLoggedInUser] = useState(null)

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

    const fetchLoggedInUser = async () => {
      try {
        const loggedInUser = await authService.getUser(profileId)
        setLoggedInUser(loggedInUser)
      } catch (error) {
        console.log(error)
      }
    }

    fetchProfile()
    fetchLoggedInUser()
  }, [profileId])

  if (!profile || !loggedInUser) {
    return <div>Loading...</div>
  }

  const isOwner = loggedInUser._id === profileId

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
              if (!trivia._id) {
                return null
              }
              return (
                <li key={trivia._id}>
                  <Link to={`/trivia/${trivia._id}`}>{trivia.title}</Link>
                  {trivia.owner._id === props.user.profile && (
                    <>
                      <Link to={`/trivia/${trivia._id}/edit`} state={trivia}>
                        Edit
                      </Link>
                      <button
                        onClick={() => props.handleDeleteTrivia(trivia._id)}
                      >
                        Delete
                      </button>
                    </>
                  )}
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
