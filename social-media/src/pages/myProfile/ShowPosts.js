import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import PostsCard from "../../components/posts/PostsCard";

function ShowPosts({ profile }) {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const { name } = useParams();

  const postUrl = BASE_URL + "/social/profiles/" + name + "/posts?_author=true&_reactions=true";

  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
    },
  };
  useEffect(() => {
    async function getPosts() {
      try {
        const response = await fetch(postUrl, options);
        const json = await response.json();
        console.log(json);
        setPosts(json);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [name]);

  // return <div>{posts.length > 0 ? <div>ok</div> : <p>you have no posts</p>}</div>;
  return (
    <div>
      <h2>Posts</h2>
      {posts || posts.length < 1 ? posts.map((post) => <PostsCard post={post} key={post.id + post.title} />) : <h2>you have no posts</h2>}
    </div>
  );
}

export default ShowPosts;
