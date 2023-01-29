import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import NavBar from "../navigation/NavBar";
import PostsCard from "../posts/PostsCard";
import { BASE_URL } from "../constants/baseUrl";

function ProfileDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const { name } = useParams();
  const profileDetailUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true";
  console.log(profileDetailUrl);
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

        // const data = response.data;

        console.log(json);
        setProfile(json);
        setPosts(json.posts);
      } catch (error) {
        console.log(error);
      }
    }
    getProfileDetail();
  }, []);
  console.log(posts);
  return (
    <>
      <NavBar />
      <div>
        {/* <img src={profile.banner} /> */}
        <div>{profile.name}</div>
        <div>{profile.email}</div>
        {/* <Avatar src={profile.avatar}></Avatar> */}
        {/* {posts.map((post) => (
        <PostsCard post={post} />
      ))} */}
      </div>
    </>
  );
}

export default ProfileDetail;
