import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import PostsCard from "../../components/posts/PostsCard";
import { AUTHOR_REACTIONS, BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../../components/constants/api";
import { getOptions } from "../../components/getOptions";
import fetchPosts from "../../components/fetch/fetchPosts";
import ErrorMessage from "../../components/feedback/ErrorMessage";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
import LoadingMorePosts from "../../components/loading/LoadingMorePosts";
import { useNavigate } from "react-router-dom";

function Home() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [numberOfPosts, setNumberOfPosts] = useState(15);
  const navigate = useNavigate();
  const options = getOptions(auth);
  const [comments, setComments] = useState("");

  const postUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS + `&limit=${numberOfPosts}`;

  // useEffect(() => {

  //   fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments);
  // }, []);

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
    fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments);
  }, [numberOfPosts]);

  const observer = useRef(null);

  const lastPost = useCallback(
    (node) => {
      if (loadingMorePosts) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setLoadingMorePosts(true);
          setNumberOfPosts(numberOfPosts + 15);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loadingMorePosts]
  );

  return (
    <>
      <div className="posts-container">
        {loading && <LoadingIndicator />}

        {error ? (
          <ErrorMessage variant="danger" message={error} />
        ) : (
          posts.map((post, index) => {
            if (posts.length === index + 1) {
              return <PostsCard post={post} key={post.id + post.title} referance={lastPost} />;
            } else {
              return <PostsCard post={post} key={post.id + post.title} />;
            }
          })
        )}
        {loadingMorePosts && <LoadingMorePosts />}
      </div>
    </>
  );
}

export default Home;

// const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
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
// window.onscroll = () => {
//   if (window.innerHeight + window.scrollY >= document.body.offsetHeight && !hasScrolledToBottom) {
//     console.log("bottom");
//     setHasScrolledToBottom(true);
//   }
// };
// const lastPost = useCallback(node => {
//   if (loading) return;
//   if (observer.current) observer.current.disconnect()
//   observer.current = new IntersectionObserver((entries) => {
//     if (entries[0])
//   })
// })
{
  /* {error ? (
          <ErrorMessage variant="danger" message={error} />
        ) : (
          posts.map((post, index) => {
            console.log(index);
            if (posts.length === index + 1) {
              return <PostsCard post={post} key={post.id + post.title} ref={lastPost} />;
            } else {
              return <PostsCard post={post} key={post.id + post.title} />;
            }
          })
        )} */
}
// }, [loading, hasmore] );

// const postUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS;
