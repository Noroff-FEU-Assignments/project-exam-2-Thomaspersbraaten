import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";

import { AuthContext } from "../../components/context/AuthContext";
import PostsCard from "../../components/posts/PostsCard";

function PostDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const postDetailUrl = BASE_URL + "/social/posts/" + id + "?_comments=true&_reactions=true";
  const options = {
    headers: {
      Authorization: `Bearer ${auth}`,
    },
  };
  useEffect(() => {
    async function getPostDetail() {
      try {
        const response = await axios.get(postDetailUrl, options);
        console.log(response.data);
        setPost(response.data);
        setComments(response.data.comments);
      } catch (error) {
        console.log(error);
      }
    }
    getPostDetail();
  }, []);

  return (
    <div>
      {/* <PostsCard post={post} /> */}
      {/* {post._count.comments} */}
      {comments.map((comment) => (
        <div> {comment.body}</div>
      ))}
    </div>
  );
}

export default PostDetail;
