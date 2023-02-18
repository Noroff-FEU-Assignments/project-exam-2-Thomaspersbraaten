async function fetchPosts(url, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments, posts, postLimitReached, setPostLimitReached) {
  if (postLimitReached) {
    return;
  }
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(response);
    console.log(json);

    if (json.length < 10) {
      setPostLimitReached(true);
    }
    if (json.errors[0].code === "too_big") {
      setPostLimitReached(true);
    }

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
    // else {
    //   setError("An error occured");
    // }
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
    setLoadingMorePosts(false);
  }
}

export default fetchPosts;
