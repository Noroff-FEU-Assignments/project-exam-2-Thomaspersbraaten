import React, { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import PostsCard from "../../components/posts/PostsCard";

function ShowPosts() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useContext(NameContext);
  const postUrl = BASE_URL + "/social/profiles/" + name + "/posts?_author=true&_reactions=true&limit=10";

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  useEffect(() => {
    async function getMyPosts() {
      try {
        const response = await fetch(postUrl, options);
        const json = await response.json();
        console.log(json);
        setPosts(json);
      } catch (error) {
        console.log(error);
      }
    }
    getMyPosts();
  }, []);

  // return <div>{posts.length > 0 ? <div>ok</div> : <p>you have no posts</p>}</div>;
  return (
    <div>
      {posts.map((post) => (
        <PostsCard post={post} key={post.id + post.title} />
      ))}
    </div>
  );
}

export default ShowPosts;
