import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
// import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import Avatar from "../../components/imageComponents/Avatar";
import { BASE_URL } from "../constants/api";
import Header from "../Header";
function ShowFollowing({ profile, following }) {
  const [authName, setAuthName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);
  // const [following, setFollowing] = useState([]);

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  const { name } = useParams();

  // const followingUrl = BASE_URL + "/social/profiles/" + name + "?_following=true";
  // useEffect(() => {
  //   async function getFollowing() {
  //     try {
  //       const response = await fetch(followingUrl, options);
  //       const json = await response.json();
  //       console.log(json);
  //       setFollowing(json.following);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  //   getFollowing();
  // }, [name]);
  return (
    <>
      <Header size="2">{following ? `Following (${following.length})` : `Following (0)`}</Header>

      {following ? (
        <div className="following-container">
          {following.map((follow, index) => (
            <div className="following" key={follow + index}>
              <Avatar src={follow.avatar} />
              <Link to={`/profiles/${follow.name}`} className="author-name">
                {follow.name}
              </Link>
            </div>
          ))}
        </div>
      ) : (
        ""
      )}
    </>
  );
}

export default ShowFollowing;

{
  /* {following.length > 0 ? (
        <>
          <h2>You are following</h2>
          <div>
            {following.map((follow, index) => (
              <div className="follower-container" key={follow + index}>
                <Avatar author={follow} />
                <Link to={`/profiles/${follow.name}`} className="author-name">
                  {follow.name}
                </Link>
              </div>
            ))}
          </div>
        </>
      ) : (
        <h2>You are following no one</h2>
      )} */
}
