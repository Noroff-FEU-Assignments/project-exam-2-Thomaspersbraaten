import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import PostsCard from "../../components/posts/PostsCard";
// import { AUTHOR_REACTIONS, BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT, POSTSURL } from "../../components/constants/api";
import { getOptions } from "../../components/getOptions";
import fetchPosts from "../../components/fetch/fetchPosts";
import ErrorMessage from "../../components/feedback/ErrorMessage";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
// import LoadingMorePosts from "../../components/loading/LoadingMorePosts";
import { useNavigate } from "react-router-dom";
import { TrackReactionContext } from "../../components/context/ReactionContext";
import FilterPosts from "../../components/ui/FilterPosts";
import Pagination from "../../components/Pagination";
import { AUTHOR, BASE_URL, REACTIONS } from "../../components/constants/baseUrl";
import FloatingError from "../../components/feedback/FloatingError";
function Home() {
  // const [comments, setComments] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(false);
  const [showError, setShowError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [loadingMorePosts, setLoadingMorePosts] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [trackReaction, setTrackReaction] = useContext(TrackReactionContext);
  const [postLimitReached, setPostLimitReached] = useState(false);
  const [searching, setSearching] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [offset, setOffset] = useState(0);
  const [postLimit, setPostLimit] = useState(15);
  const navigate = useNavigate();
  const options = getOptions(auth);

  const postUrl = BASE_URL + `posts?${AUTHOR}&${REACTIONS}&offset=${offset}&limit=${postLimit}`;

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
    if (!trackReaction) {
      setTrackReaction([]);
    }
    fetchPosts(postUrl, options, setPosts, setError, setLoading, setShowError);
  }, [offset]);

  return (
    <>
      {/* <FilterPosts posts={posts} setPosts={setPosts} setSearching={setSearching} setSearchInput={setSearchInput} setPostLimitReached={setPostLimitReached} /> */}
      <Pagination offset={offset} setOffset={setOffset} />
      {loading && <LoadingIndicator />}
      {showError && <FloatingError error={error} setShowError={setShowError} />}

      {posts.map((post) => (
        <PostsCard post={post} key={post.id + post.title} />
      ))}
      <Pagination offset={offset} setOffset={setOffset} />
    </>
  );
}

export default Home;

// const searchUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS + "&_tag=" + searchInput + `&limit=${numberOfPosts}&offset=${offset}`;

// useEffect(() => {
//   console.log("first");
//   if (!auth) {
//     navigate("/welcome");
//   }
//   if (!trackReaction) {
//     setTrackReaction([]);
//   }
//   fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, postLimitReached, setPostLimitReached);
// }, [numberOfPosts]);
// useEffect(() => {
//   if (searching) {
//     console.log("second");

//     fetchPosts(searchUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, postLimitReached, setPostLimitReached);
//   }
// }, [searching]);

// useEffect(() => {
//   if (!searching && searchInput.length === 0) {
//     fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, postLimitReached, setPostLimitReached);
//   }
// }, [searchInput]);
{
  /* {error ? (
        <ErrorMessage variant="danger" message={error} />
      ) : (
        posts.map((post, index) => {
          if (posts.length === index + 1) {
            return <PostsCard post={post} key={post.id + post.title} />;
          } else {
            return <PostsCard post={post} key={post.id + post.title} />;
          }
        })
      )} */
}
{
  /* {loadingMorePosts || (!postLimitReached && <LoadingMorePosts />)} */
}
{
  /* {postLimitReached && (
          <div className="end-container">
            <ErrorMessage message={postLimitReached} variant="warning" />
          </div>
        )} */
}

// const observer = useRef(null);
// return <PostsCard post={post} key={post.id + post.title} referance={lastPost} />;

// const lastPost = useCallback(
//   (node) => {
//     if (loadingMorePosts) return;
//     if (observer.current) observer.current.disconnect();
//     observer.current = new IntersectionObserver((entries) => {
//       if (entries[0].isIntersecting) {
//         setLoadingMorePosts(true);
//         setNumberOfPosts(numberOfPosts + 15);
//       }
//     });
//     if (node) observer.current.observe(node);
//   },
//   [loadingMorePosts]
// );
// useEffect(() => {
//   if (searching) {
//     setTimeout(() => {
//       console.log("time");
//       console.log(searchUrl);
//       fetchPosts(searchUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, postLimitReached, setPostLimitReached);
//       if (searchInput.length === 0) {
//         fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, postLimitReached, setPostLimitReached);
//       }
//     }, 1000);
//   }
// }, [searchInput]);

//

// useEffect(() => {
//   if (!auth) {
//     navigate("/welcome");
//   }
//   if (!trackReaction) {
//     setTrackReaction([]);
//   }
//   // fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments, posts, postLimitReached, setPostLimitReached);
//   async function fetchPosts() {
//     if (postLimitReached) {
//       return;
//     }
//     try {
//       const response = await fetch(postUrl, options);
//       const json = await response.json();

//       console.log(json);
//       console.log(response);

//       if (json.length < 15) {
//         setPostLimitReached("No more posts to show...");
//       }

//       if (response.status === 400) {
//         if (json.errors && json.errors[0] && json.errors[0].code === "too_big") {
//           setPostLimitReached("This is the end, You cannot view more than 100 posts");
//         } else {
//           setError("an error occured man");
//         }
//       }

//       if (response.status === 200) {
//         setError(false);
//         setPosts(json);
//       }
//       if (response.status === 404) {
//         setError("An error occured, Please try again.");
//       }
//       if (response.status === 429) {
//         setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
//       }
//     } catch (error) {
//       setError("An error occured, Please try again.");
//       console.log(error);
//     } finally {
//       setLoading(false);
//       setLoadingMorePosts(false);
//     }
//   }
//   fetchPosts();
// }, [numberOfPosts]);
