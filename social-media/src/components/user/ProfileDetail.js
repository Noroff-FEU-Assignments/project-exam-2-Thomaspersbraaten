import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import NavBar from "../navigation/NavBar";
import PostsCard from "../posts/PostsCard";
import { BASE_URL } from "../constants/baseUrl";
import Banner from "../imageComponents/Banner";
import Avatar from "../imageComponents/Avatar";
import UserContainer from "./UserContainer";
import ProfileLinks from "./ProfileLinks";
import { ProfileContext } from "../context/ProfileContext";

function ProfileDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  // const [profile, setProfile] = useContext(ProfileContext);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const [counts, setCounts] = useState([]);

  const { name } = useParams();
  // const profileDetailUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true&_following=true&_followers=true";
  const profileDetailUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true&_following=true&_followers=true";

  // console.log(profileDetailUrl);
  const options = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  useEffect(() => {
    async function getProfileDetail() {
      try {
        const response = await fetch(profileDetailUrl, options);
        const json = await response.json();

        console.log(json);
        setProfile(json);
        forceUpdate();
      } catch (error) {
        console.log(error);
      }
    }
    getProfileDetail();
  }, []);

  return (
    // <>
    //   <NavBar />
    //   <div className="profile-container">
    //     <div className="image-container">
    //       <Banner author={profile} />
    //       <Avatar cssClass="profile-avatar" author={profile} />
    //     </div>
    //     <UserContainer profile={profile} />

    //     <ProfileLinks profile={profile} />
    //   </div>
    // </>
    <>
      <NavBar />
      <div className="profile-container">
        <div className="image-container">
          <Banner author={profile} />
          <Avatar cssClass="profile-avatar" author={profile} />
        </div>
        {/* <UserContainer /> */}

        {/* <ProfileLinks /> */}
        <div>
          {profile.followers.map((follower) => (
            <Link to={`/profiles/${follower.name}`}>{follower.name}</Link>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProfileDetail;
