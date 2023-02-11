import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import axios from "axios";
import PostsCard from "../../components/posts/PostsCard";
import { AUTHOR_REACTIONS, BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../../components/constants/api";
import { getOptions } from "../../components/getOptions";

function Home() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);
  const postUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS;

  const options = getOptions(auth);

  useEffect(() => {
    console.log(postUrl);
    async function getPosts() {
      try {
        const response = await axios.get(postUrl, options);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <div className="posts-container">
        {posts.map((post) => (
          <PostsCard post={post} key={post.id + post.title} />
        ))}
      </div>
    </>
  );
}

export default Home;
