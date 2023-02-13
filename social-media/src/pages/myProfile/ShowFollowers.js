import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import { ProfileContext } from "../../components/context/ProfileContext";
import Avatar from "../../components/imageComponents/Avatar";

function ShowFollowers({ followers, setFollowers }) {
  // const [authName, setAuthName] = useContext(NameContext);
  // const [auth, setAuth] = useContext(AuthContext);
  // const [followers, setFollowers] = useState([]);
  // const [profile, setProfile] = useContext(ProfileContext);
  // const [profile, setProfile] = useState([]);

  // const { name } = useParams();

  return (
    <div className="profile-bottom-container">
      {followers.length > 0 ? (
        <>
          <h2>Your followers</h2>
          <div className="follower-container">
            {followers.map((follower, index) => (
              <div className="follower" key={follower + index}>
                <Avatar author={follower} />
                <Link to={`/profiles/${follower.name}`} className="author-name">
                  {follower.name}
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2>You have no followers</h2>
      )}
    </div>
  );
}

export default ShowFollowers;

// const options = {
//   headers: {
//     Authorization: `bearer ${auth}`,
//   },
// };
// const followersUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true&_following=true&_followers=true";
// useEffect(() => {
//   async function getFollowers() {
//     try {
//       const response = await fetch(followersUrl, options);
//       const json = await response.json();
//       // console.log(json);
//       setFollowers(json.followers);
//       // setProfile(json);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   getFollowers();
// }, [name]);
