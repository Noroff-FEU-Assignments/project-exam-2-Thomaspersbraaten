import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import Avatar from "../../components/imageComponents/Avatar";
function ShowFollowing() {
  const [authName, setAuthName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [following, setFollowing] = useState([]);

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  const { name } = useParams();

  const followingUrl = BASE_URL + "/social/profiles/" + name + "?_following=true&_followers=true";
  useEffect(() => {
    async function getFollowing() {
      try {
        const response = await fetch(followingUrl, options);
        const json = await response.json();
        console.log(json);

        setFollowing(json.following);
      } catch (error) {
        console.log(error);
      }
    }
    getFollowing();
  }, []);
  return (
    <div className="profile-bottom-container">
      <h2>You are following</h2>
      <div>
        {following.map((follow) => (
          <div className="follower-container">
            <Avatar author={follow} />
            <Link to={`/profiles/${follow.name}`} className="author-name">
              {follow.name}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShowFollowing;
