import React, { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
// import { AUTHOR_REACTIONS, BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../constants/api";
// import { AuthContext } from "../context/AuthContext";
// import { getOptions } from "../getOptions";

function FilterPosts({ setSearchInput, setSearching, setPostLimitReached }) {
  //   const [auth, setAuth] = useContext(AuthContext);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <input
        placeholder="Search..."
        onChange={(e) => {
          setSearchInput(e.target.value);
          setSearching(false);
          setPostLimitReached(false);
        }}
      ></input>
      <Button
        onClick={() => {
          setSearching(true);
          setPostLimitReached(false);
        }}
      >
        Search
      </Button>
    </form>
  );
}

export default FilterPosts;

//   const [searchInput, setSearchInput] = useState("");
//   const catUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + AUTHOR_REACTIONS + "&_tag=" + searchInput;
//   const options = getOptions(auth, "GET");
//   async function performSearch() {
//     const response = await fetch(catUrl, options);
//     const json = await response.json();
//     console.log(response, json);
//     if (response.status === 200) {
//       setSearching(true);
//       setPosts(json);
//     }
//   }
//   useEffect(() => {
//     console.log(searchInput);
//     if (searchInput.length === 0) {
//       setSearching(false);
//       console.log("no");
//     }
//   }, [searchInput]);
