import { Avatar } from "@mui/material";

import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import styles from "./MyProfile.module.css";
import removeProfilePicture from "./removeProfilePicture";
import img from "../../img.png";

function MyProfile() {
  const [name, setName] = useContext(NameContext);
  const [auth, setAuth] = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState("");
  const [avatar, setAvatar] = useState("");
  const [posts, setPosts] = useState([]);
  const [profile, setProfile] = useState([]);

  const myProfileUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true";

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };

  useEffect(() => {
    async function getProfile() {
      try {
        const response = await fetch(myProfileUrl, options);
        const json = await response.json();
        // console.log(response);
        console.log(json);
        setProfile(json);
        setPosts(json.posts);
        setAvatar(json.avatar);
      } catch (error) {
        console.log(error);
      }
    }
    getProfile();
  }, []);

  return (
    <div>
      <img src={profile.banner} />
      <div>{profile.name}</div>
      <div>{profile.email}</div>
      <Avatar src={profile.avatar}></Avatar>
      <div>Posts</div>
      <div>Followers</div>

      <div>Following</div>

      {/* <div className={styles.modalBackground}>
        <img src={profile.avatar} className={styles.imageLarge} />
 
      </div>  */}
      <div className={styles.buttonContainer}>
        <button
          onClick={() => {
            removeProfilePicture(auth, name, "avatar", imageUrl, "change");
          }}
        >
          Change avatar picture
        </button>
        <button
          onClick={() => {
            removeProfilePicture(auth, name, "avatar");
          }}
        >
          Remove avatar picture
        </button>
        <button
          onClick={() => {
            removeProfilePicture(auth, name, "banner");
          }}
        >
          Remove banner picture
        </button>
        <button>Cancel</button>
        <input
          onChange={(e) => {
            setImageUrl(e.target.value);
          }}
        />
      </div>
    </div>
  );
}

export default MyProfile;
