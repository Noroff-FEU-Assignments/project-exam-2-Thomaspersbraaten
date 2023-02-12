import { useEffect } from "react";
import { BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../constants/api";
import fetchPosts from "../fetch/fetchPosts";
import { getOptions } from "../getOptions";

function editPost(title, body, media, tags, auth, id, setPost) {
  const editPostUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + `/${id}`;

  const data = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  };
  const options = getOptions(auth, "PUT", data);

  async function sendData() {
    try {
      const response = await fetch(editPostUrl, options);
      const json = await response.json();
      setPost(json);
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }
  sendData();
  // useEffect(( ) => {
  //   fetchPosts()
  // })
}

export default editPost;
