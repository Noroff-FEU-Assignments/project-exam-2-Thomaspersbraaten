import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import { ProfileContext } from "../../components/context/ProfileContext";
import Avatar from "../../components/imageComponents/Avatar";

function ShowFollowers() {
  const [authName, setAuthName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);
  const [profile, setProfile] = useContext(ProfileContext);

  const { name } = useParams();

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
  //       console.log(json);

  //       setProfile(json);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getFollowers();
  // }, []);
  console.log(profile);
  console.log(profile.name);

  return (
    <div className="profile-bottom-container">
      <h2>Your followers</h2>
      <div>
        {profile.followers.map((follower) => (
          <div className="follower-container">
            <Avatar author={follower.avatar} />
            <Link to={`/profiles/${follower.name}`} className="author-name">
              {follower.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowFollowers;
