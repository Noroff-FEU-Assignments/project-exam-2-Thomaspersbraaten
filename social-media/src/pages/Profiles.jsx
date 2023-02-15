import { useContext, useEffect } from "react";
import { AUTHOR_REACTIONS_COMMENTS, BASE_URL, POSTS_URL_EXT, PROFILES, SOCIAL_URL_EXT } from "../components/constants/api";
import { AuthContext } from "../components/context/AuthContext";
import { getOptions } from "../components/getOptions";

function Profiles() {
  const [auth] = useContext(AuthContext);

  const queryParams = new URLSearchParams(window.location.search);
  //   queryParams.set("sort", "_count[comments]");
  queryParams.set("sort", "created");

  queryParams.set("sortOrder", "desc");
  const profileUrl = BASE_URL + SOCIAL_URL_EXT + PROFILES;

  //   AUTHOR_REACTIONS_COMMENTS +
  //   ?sort=_count.followers&sortOrder=desc"
  //   &sort=followers&sortOrder=asc

  const options = getOptions(auth, "GET");

  useEffect(() => {
    async function getProfiles() {
      console.log(profileUrl);
      try {
        const response = await fetch(profileUrl, options);
        console.log(response);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
    getProfiles();
  });
  return <div>Profiles</div>;
}

export default Profiles;
