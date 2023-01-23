import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";

import { AuthContext } from "../../components/context/AuthContext";
import Comments from "./comment/Comments";
import PostsCard from "../../components/posts/PostsCard";
import CommentForm from "./comment/form/CommentForm";
import deletePost from "../../components/ui/deletePost";
import NavBar from "../../components/navigation/NavBar";

function PostDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const { id } = useParams();
  const postDetailUrl = BASE_URL + "/social/posts/" + id + "?_comments=true&_reactions=true&_author=true";
  const options = {
    headers: {
      Authorization: `bearer ${auth}`,
      "Content-type": "application/json",
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
    console.log(comments);
  }, []);
  console.log(post);

  return (
    <>
      <NavBar />
      <div>
        <button
          onClick={() => {
            deletePost(id, auth);
          }}
        >
          Delete
        </button>
        {/* <PostsCard post={post} /> */}
        {/* {post._count.comments} */}
        <CommentForm id={id} setComments={setComments} comments={comments} />

        {comments.map((comment) => (
          // <div> {comment.body}</div>
          <Comments comment={comment} key={comment.id + comment.created} />
        ))}
      </div>
    </>
  );
}

export default PostDetail;
