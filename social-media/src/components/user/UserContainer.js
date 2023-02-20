import Button from "react-bootstrap/esm/Button";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { AuthContext } from "../context/AuthContext";
import { NameContext } from "../context/NameContext";
// import Follow from "./Follow";
import { getOptions } from "../getOptions";

// function UserContainer({ profile }) {
function UserContainer({ profile, amIFollowing, setAmIFollowing, followers, setFollowers }) {
  // const [following, setFollowing] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  // const [profile, setProfile] = useState([]);

  const { name } = useParams();

  const unfollowUrl = BASE_URL + "/social/profiles/" + name + "/unfollow";
  const followUrl = BASE_URL + "/social/profiles/" + name + "/follow";

  // const options = {
  //   method: "PUT",
  //   headers: {
  //     Authorization: `bearer ${auth}`,
  //   },
  // };
  const options = getOptions(auth, "PUT");

  async function followUser() {
    console.log("following", followers);
    console.log(followUrl);
    console.log(options);

    try {
      const response = await fetch(followUrl, options);
      const json = await response.json();
      console.log(json);
      if (json.name) {
        setAmIFollowing(true);
        setFollowers([
          ...followers,
          {
            name: json.name,
            avatar: json.avatar,
          },
        ]);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function unfollowUser() {
    console.log("unfollowing", followers);
    console.log(options);
    console.log(unfollowUrl);

    try {
      const response = await fetch(unfollowUrl, options);
      console.log(response);
      const json = await response.json();
      console.log(json);

      if (json.name) {
        const filteredFollowers = followers.filter((fol) => fol.name !== json.name);
        console.log(filteredFollowers);
        setFollowers(filteredFollowers);
        setAmIFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="user-container">
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>

      {authName === name ? (
        ""
      ) : (
        <Button
          variant={!amIFollowing ? "primary" : "warning"}
          onClick={() => {
            if (amIFollowing) {
              unfollowUser();
            } else {
              followUser();
            }
          }}
        >
          {amIFollowing ? "Unfollow" : "follow"}
        </Button>
      )}
    </div>
  );
}

export default UserContainer;
