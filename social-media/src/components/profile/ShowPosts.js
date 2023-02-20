import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import { NameContext } from "../../components/context/NameContext";
import PostsCard from "../../components/posts/PostsCard";
import { BASE_URL } from "../constants/api";
import Header from "../Header";

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

        setPosts(json);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, [name]);

  return (
    <div>
      <Header size="2">{posts || posts.length < 1 ? `Posts (${posts.length})` : <h2>Posts (0)</h2>}</Header>

      {posts && (
        <>
          <div className="profile-posts">
            {posts.map((post) => (
              <PostsCard post={post} key={post.id + post.title} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default ShowPosts;
// : (
//   <h2>You have no posts</h2>
// )
