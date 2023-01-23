import { useContext, useEffect, useState } from "react";
import { BASE_URL } from "../../components/constants/baseUrl";
import { AuthContext } from "../../components/context/AuthContext";
import axios from "axios";
import PostsCard from "../../components/posts/PostsCard";
import NavBar from "../../components/navigation/NavBar";

function Home() {
  const [posts, setPosts] = useState([]);
  const [auth, setAuth] = useContext(AuthContext);

  const postUrl = BASE_URL + "/social/posts?_author=true";

  const options = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };

  useEffect(() => {
    async function getPosts() {
      try {
        const response = await axios.get(postUrl, options);
        console.log(response.data);
        setPosts(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getPosts();
  }, []);

  return (
    <>
      <NavBar />
      <div>
        {posts.map((post) => (
          <PostsCard post={post} key={post.id + post.title} />
        ))}
      </div>
    </>
  );
}

export default Home;
