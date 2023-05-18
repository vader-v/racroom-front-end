import TriviaCard from "../TriviaCard/TriviaCard"

const ProfileTriviaList = ({ profileTrivias }) => {
  return (
    <div>
      {profileTrivias.map((trivia) => (
        <TriviaCard key={trivia._id} trivia={trivia} />
      ))}
    </div>
  )
}

export default ProfileTriviaList