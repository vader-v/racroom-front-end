import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import * as profileService from '../../services/profileService';

const Profiles = () => {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profileData = await profileService.getProfileById(profileId);
        setProfile(profileData);
      } catch (error) {
        console.log(error);
      }
    };

    fetchProfile();
  }, [profileId]);

  if (!profile) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Profile Details</h2>
      <h3>Name: {profile.name}</h3>
      <img src={profile.photo} alt="Profile" />
      {/* Display the trivias associated with the profile */}
      {profile.trivia && profile.trivia.length > 0 ? (
        <div>
          <h3>Trivias:</h3>
          <ul>
            {profile.trivia.map((triviaId) => (
              <li key={triviaId}>{triviaId}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div>No trivias found.</div>
      )}
    </div>
  );
};

export default Profiles;
