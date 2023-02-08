import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../constants/baseUrl";
import { AuthContext } from "../context/AuthContext";

function editPost(title, body, media, tags, auth, id, setPost) {
  const editPostUrl = BASE_URL + "/social/posts/" + id;
  const raw = JSON.stringify({
    title: title,
    body: body,
    tags: tags,
    media: media,
  });

  const requestOptions = {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${auth}`,
      "Content-Type": "application/json",
    },
    body: raw,
  };

  async function sendData() {
    try {
      const response = await fetch(editPostUrl, requestOptions);
      const json = await response.json();
      setPost(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
  sendData();
}

export default editPost;
