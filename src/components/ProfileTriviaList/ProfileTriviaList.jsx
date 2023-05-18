// components/ProfileTriviaList.js

import { useLocation } from 'react-router-dom';
import TriviaCard from '../TriviaCard/TriviaCard';

const ProfileTriviaList = ({ triviaDetails }) => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const profileId = searchParams.get('profileId');

  const filteredTrivias = triviaDetails.filter(
    (trivia) => trivia.profileId === profileId
  );

  return (
    <div>
      <h3>Trivias:</h3>
      {filteredTrivias.map((trivia) => (
        <TriviaCard key={trivia._id} trivia={trivia} />
      ))}
    </div>
  );
};

export default ProfileTriviaList;
