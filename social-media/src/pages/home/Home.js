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
import { TrackReactionContext } from "../../components/context/ReactionContext";
import Button from "react-bootstrap/esm/Button";
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
  const [trackReaction, setTrackReaction] = useContext(TrackReactionContext);
  const [postLimitReached, setPostLimitReached] = useState(false);
  const postUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS + `&limit=${numberOfPosts}`;
  // const catUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS + "&_tag=";

  // useEffect(() => {

  //   fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments);
  // }, []);

  useEffect(() => {
    if (!auth) {
      navigate("/welcome");
    }
    if (!trackReaction) {
      setTrackReaction([]);
    }
    // fetchPosts(postUrl, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments, posts, postLimitReached, setPostLimitReached);
    async function fetchPosts() {
      if (postLimitReached) {
        return;
      }
      try {
        const response = await fetch(postUrl, options);
        const json = await response.json();

        console.log(json);
        console.log(response);

        if (json.length < 15) {
          setPostLimitReached("No more posts to show...");
        }
        // const jsonError = json.errors ? json.errors[0] : undefined;
        // if (jsonError.code === "too_big") {
        //   setPostLimitReached(true);
        // }
        if (response.status === 400) {
          if (json.errors && json.errors[0] && json.errors[0].code === "too_big") {
            setPostLimitReached("This is the end, You cannot view more than 100 posts");
          } else {
            setError("an error occured man");
          }
        }

        // if (response.status === 400 && json.errors[0].code !== "too_big") {
        //   setError("An error occured sis");
        // } else {
        //   setError("An error occured bro");
        // }

        if (response.status === 200) {
          setError(false);
          setPosts(json);
        }
        if (response.status === 404) {
          setError("An error occured, Please try again.");
        }
        if (response.status === 429) {
          setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
        }
      } catch (error) {
        setError("An error occured, Please try again.");
        console.log(error);
      } finally {
        setLoading(false);
        setLoadingMorePosts(false);
      }
    }
    fetchPosts();
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
        {!loading && <Button>filter</Button>}

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

        {loadingMorePosts || (!postLimitReached && <LoadingMorePosts />)}
        {postLimitReached && <ErrorMessage message={postLimitReached} variant="warning" />}
      </div>
    </>
  );
}

export default Home;
