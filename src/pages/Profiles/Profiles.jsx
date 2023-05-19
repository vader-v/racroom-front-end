import { Link, useParams } from "react-router-dom"
import { useEffect, useState } from "react"

import * as profileService from "../../services/profileService"
import * as triviaService from "../../services/triviaService"
import * as authService from "../../services/authService"


import raccoonIcon from '../../assets/icons/raccoon.svg'

// css
import styles from "./Profiles.module.css"

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

  
  const profilePhoto = profile.photo || raccoonIcon

  return (
    <div className={styles["profiles-container"]}>
      <div className={styles["profile-details"]}>
        <div className={styles["profile-header"]}>
          <div className={styles["profile-image"]}>

            <img src={profilePhoto} alt="Profile" />
          </div>
          {triviaDetails.length > 0 ? (
            <div className={styles["trivia-count"]}>
              <span>{triviaDetails.length}</span> Trivias
            </div>
          ) : null}
        </div>
        <div className={styles["profile-content"]}>
          <h2>{profile.name}</h2>
          {/* Display additional profile information here */}
        </div>
        {triviaDetails.length > 0 ? (
          <div className={styles["trivia-section"]}>
            <h3>Trivias:</h3>
            <ul className={styles["trivia-list"]}>
              {triviaDetails.map((trivia) => {
                if (!trivia._id) {
                  return null
                }
                return (
                  <li key={trivia._id} className={styles["trivia-item"]}>
                    <Link
                      to={`/trivia/${trivia._id}`}
                      className={styles["trivia-link"]}
                    >
                      <p>
                      Title: {trivia.title}; Category: {trivia.category}; Number of questions: {trivia.questions.length}
                      </p>
                    </Link>
                    {trivia.owner._id === props.user.profile && (
                      <div className={styles.buttoncontainer}>
                        <Link
                          to={`/trivia/${trivia._id}/edit`}
                          state={trivia}
                          className={styles["trivia-edit-link"]}
                        >
                          <button className={styles["trivia-edit-button"]}>
                            Edit
                          </button>
                        </Link>
                        <button
                          onClick={() => props.handleDeleteTrivia(trivia._id)}
                          className={styles["trivia-delete-button"]}
                        >
                          Delete
                        </button>
                      </div>
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
    </div>
  )
}

export default Profiles
