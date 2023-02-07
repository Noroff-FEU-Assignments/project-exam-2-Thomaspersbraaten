import Button from "react-bootstrap/esm/Button";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { AuthContext } from "../context/AuthContext";
import { NameContext } from "../context/NameContext";
import Follow from "./Follow";

// function UserContainer({ profile }) {
function UserContainer() {
  const [following, setFollowing] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const [profile, setProfile] = useState([]);

  const { name } = useParams();

  const profileOptions = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  const options = {
    method: "PUT",
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  const profileUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true&_following=true&_followers=true";
  // get profile
  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(profileUrl, profileOptions);
        const json = await response.json();
        console.log(json);
        const followers = json.followers;
        console.log(followers);
        const amIFollowing = followers?.some((follower) => {
          return follower.name === authName;
        });
        if (amIFollowing) {
          setFollowing(true);
        } else {
          setFollowing(false);
        }
        console.log(amIFollowing);
        setProfile(json);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, [name]);
  // let followingVariable = "";

  // useEffect(() => {
  //   async function updateFollowers() {
  //     // console.log(profile);
  //     const followers = profile.followers;
  //     console.log(followers);
  //     const amIFollowing = followers?.some((follower) => {
  //       return follower.name === authName;
  //     });
  //     console.log(amIFollowing);
  //     if (amIFollowing) {
  //       // followingVariable = "/unfollow";
  //       setFollowing(true);
  //       //   setFollowUrl(BASE_URL + "/social/profiles/" + name + "/unfollow");
  //     } else {
  //       // followingVariable = "/follow";
  //       setFollowing(false);
  //       //   setFollowUrl(BASE_URL + "/social/profiles/" + name + "/follow");
  //     }
  //   }
  //   updateFollowers();
  // }, []);

  const unfollowUrl = BASE_URL + "/social/profiles/" + name + "/unfollow";
  const followUrl = BASE_URL + "/social/profiles/" + name + "/follow";

  async function followUser() {
    try {
      const response = await fetch(followUrl, options);
      const json = await response.json();
      // console.log(json);
      if (json) {
        setFollowing(true);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async function unfollowUser() {
    try {
      // setFollowing(false);
      const response = await fetch(unfollowUrl, options);
      const json = await response.json();
      // console.log(json);
      if (json) {
        setFollowing(false);
      }
    } catch (error) {
      console.log(error);
    }
  }
  // const [follow, setFollow] = useState([]);
  // useEffect(() => {
  //   const followers = profile.followers;
  //   const amIFollowing = followers.some((follower) => {
  //     return follower.name === "Banana";
  //   });
  //   setFollow(amIFollowing);
  // }, []);

  return (
    <div className="user-container">
      <h2>{profile.name}</h2>
      <p>{profile.email}</p>

      {/* <Follow profile={profile} /> */}

      {authName === name ? (
        ""
      ) : (
        <Button
          variant={!following ? "primary" : "warning"}
          onClick={() => {
            if (following) {
              unfollowUser();
            } else {
              followUser();
            }
          }}
        >
          {following ? "Unfollow" : "follow"}
        </Button>
      )}
    </div>
  );
}

export default UserContainer;
