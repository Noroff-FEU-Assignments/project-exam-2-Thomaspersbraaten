import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import Avatar from "../../components/imageComponents/Avatar";

function ShowFollowers() {
  const [name, setName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [followers, setFollowers] = useState([]);

  const { user } = useParams();

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  const followersUrl = BASE_URL + "/social/profiles/" + name + "?_followers=true";
  useEffect(() => {
    async function getFollowers() {
      try {
        const response = await fetch(followersUrl, options);
        const json = await response.json();
        console.log(json);

        setFollowers(json.followers);
      } catch (error) {
        console.log(error);
      }
    }
    getFollowers();
  }, []);

  return (
    <div className="profile-bottom-container">
      <h2>Your followers</h2>
      <div>
        {followers.map((follower) => (
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
