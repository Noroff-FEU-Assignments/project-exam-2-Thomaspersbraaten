async function fetchPosts(url, options, setPosts, setError, setLoading, setLoadingMorePosts, setComments) {
  try {
    const response = await fetch(url, options);
    const json = await response.json();
    console.log(json);
    if (response.status === 200) {
      setError(false);
      setPosts(json);
    } else {
      setError("An error occured");
    }
    if (response.status === 404) {
      setError("An error occured, Please try again.");
    }
    if (response.status === 429) {
      setError("You performed too many requests to the site, Please wait 30 seconds before retrying. ");
    }
  } catch (error) {
    setError(error);
  } finally {
    setLoading(false);
    setLoadingMorePosts(false);
  }
}

export default fetchPosts;
