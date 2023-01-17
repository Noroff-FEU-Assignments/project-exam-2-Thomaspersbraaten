import { Avatar } from "@mui/material";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../components/constants/baseUrl";
import { AuthContext } from "../components/context/AuthContext";
import PostsCard from "../components/posts/PostsCard";

function ProfileDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [posts, setPosts] = useState([]);
  const { name } = useParams();
  const profileDetailUrl = BASE_URL + "/social/profiles/" + name + "?_posts=true";
  const options = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  useEffect(() => {
    async function getProfileDetail() {
      try {
        const response = await axios.get(profileDetailUrl, options);
        const data = response.data;
        console.log(data);
        setProfile(data);
        setPosts(data.posts);
      } catch (error) {
        console.log(error);
      }
    }
    getProfileDetail();
  }, []);
  console.log(posts);
  return (
    <div>
      <img src={profile.banner} />
      <div>{profile.name}</div>
      <div>{profile.email}</div>
      <Avatar src={profile.avatar}></Avatar>
      {/* {posts.map((post) => (
        <PostsCard post={post} />
      ))} */}
    </div>
  );
}

export default ProfileDetail;
