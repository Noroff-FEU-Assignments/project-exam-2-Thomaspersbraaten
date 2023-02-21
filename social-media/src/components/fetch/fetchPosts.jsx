async function fetchPosts(url, options, setPosts, setError, setLoading) {
  setLoading(true);
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);
    console.log(response);

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
  }
}

export default fetchPosts;
