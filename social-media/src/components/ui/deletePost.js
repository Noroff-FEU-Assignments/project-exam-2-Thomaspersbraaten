import { BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../constants/api";
import { getOptions } from "../getOptions";

function deletePost(id, auth) {
  //   const [auth, setAuth] = useContext(AuthContext);

  const deleteUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + `/${id}`;

  const options = getOptions(auth, "DELETE");

  async function performDelete() {
    try {
      const response = await fetch(deleteUrl, options);
      const json = await response.json();
      console.log(response);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
  performDelete();
}

export default deletePost;
