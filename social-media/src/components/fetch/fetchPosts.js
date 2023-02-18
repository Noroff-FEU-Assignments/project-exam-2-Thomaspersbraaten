// async function fetchPosts(url, options, setPosts, setError, setLoading, setLoadingMorePosts, postLimitReached, setPostLimitReached) {
//   if (postLimitReached) {
//     return;
//   }
//   try {
//     const response = await fetch(url, options);
//     const json = await response.json();

//     console.log(json);
//     console.log(response);

//     if (json.length < 15) {
//       setPostLimitReached("No more posts to show...");
//     }

//     if (response.status === 400) {
//       if (json.errors && json.errors[0] && json.errors[0].code === "too_big") {
//         setPostLimitReached("This is the end, You cannot view more than 100 posts");
//       } else {
//         setError("an error occured");
//       }
//     }

//     if (response.status === 200) {
//       setError(false);
//       setPosts(json);
//     }
//     if (response.status === 404) {
//       setError("An error occured, Please try again.");
//     }
//     if (response.status === 429) {
//       setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
//     }
//   } catch (error) {
//     setError("An error occured, Please try again.");
//     console.log(error);
//   } finally {
//     setLoading(false);
//     setLoadingMorePosts(false);
//   }
// }

// export default fetchPosts;
async function fetchPosts(url, options, setPosts, setError, setLoading) {
  setLoading(true);
  try {
    const response = await fetch(url, options);
    const json = await response.json();

    console.log(json);
    console.log(response);

    // if (json.length < 15) {
    //   setPostLimitReached("No more posts to show...");
    // }

    // if (response.status === 400) {
    //   if (json.errors && json.errors[0] && json.errors[0].code === "too_big") {
    //     setPostLimitReached("This is the end, You cannot view more than 100 posts");
    //   } else {
    //     setError("an error occured");
    //   }
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
    // setLoadingMorePosts(false);
  }
}

export default fetchPosts;
