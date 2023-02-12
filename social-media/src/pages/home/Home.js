import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import PostsCard from "../../components/posts/PostsCard";
import { AUTHOR_REACTIONS, BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../../components/constants/api";
import { getOptions } from "../../components/getOptions";
import fetchPosts from "../../components/fetch/fetchPosts";
import ErrorMessage from "../../components/feedback/ErrorMessage";
import LoadingIndicator from "../../components/loading/LoadingIndicator";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [auth, setAuth] = useContext(AuthContext);
  const postUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS;
  const options = getOptions(auth);

  useEffect(() => {
    fetchPosts(postUrl, options, setPosts, setError, setLoading);
  }, []);

  return (
    <>
      <div className="posts-container">
        {loading && <LoadingIndicator />}
        {error ? <ErrorMessage variant="danger" message={error} /> : posts.map((post) => <PostsCard post={post} key={post.id + post.title} />)}
      </div>
    </>
  );
}

export default Home;

{
  /* <div className="posts-container">{error ? <ErrorMessage variant="danger" message={error} /> : posts.map((post) => <PostsCard post={post} key={post.id + post.title} />)}</div> */
}
// (async function () {
//   // const data = await fetchPosts(postUrl, options, setPosts, setError);
//   await fetchPosts(postUrl, options, setPosts, setError);
// })();
{
  /* <div className="posts-container">
        {error && <ErrorMessage variant="danger" message={error} />}
        {posts.map((post) => (
          <PostsCard post={post} key={post.id + post.title} />
        ))}
      </div> */
}
// const thePosts = fetchPosts(postUrl, options);
// useEffect(() => {
//   async function posts() {
//     try {
//       const data = await fetchPosts(postUrl, options);
//       if (Array.isArray(data)) {
//         console.log("ok bro");
//       } else {
//         throw new Error("data is not array");
//       }
//       console.log(data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   posts();
// }, []);
// useEffect(() => {

//   console.log(postUrl);
//   async function getPosts() {
//     try {
//       const response = await axios.get(postUrl, options);
//       setPosts(response.data);
//     } catch (error) {
//       console.log(error);
//     }
//   }
//   getPosts();
// }, []);
