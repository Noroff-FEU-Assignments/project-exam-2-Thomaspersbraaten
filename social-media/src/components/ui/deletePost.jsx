import { BASE_URL } from "../constants/baseUrl";
import { getOptions } from "../getOptions";

async function deletePost(id, auth) {
  const deleteUrl = BASE_URL + `posts/${id}`;
  const options = getOptions(auth, "DELETE");

  try {
    const response = await fetch(deleteUrl, options);
    const json = await response.json();
    console.log(response);
    console.log(json);
  } catch (error) {
    console.log(error);
  }
}

export default deletePost;
