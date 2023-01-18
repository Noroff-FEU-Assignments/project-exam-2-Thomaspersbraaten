import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { AuthContext } from "../context/AuthContext";

function deletePost(id, auth) {
  //   const [auth, setAuth] = useContext(AuthContext);

  const deleteUrl = BASE_URL + "/social/posts/" + id;
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
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
