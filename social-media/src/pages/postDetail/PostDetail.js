import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";

import { AuthContext } from "../../components/context/AuthContext";
import Comments from "./comment/Comments";
import PostsCard from "../../components/posts/PostsCard";
import CommentForm from "./comment/form/CommentForm";
import deletePost from "../../components/ui/deletePost";
import NavBar from "../../components/navigation/NavBar";
import { NameContext } from "../../components/context/NameContext";
import Avatar from "../../components/imageComponents/Avatar";
import Card from "react-bootstrap/Card";
import imagePlaceholder from "../../images/image-placeholder.png";
import PostDate from "../../components/moment/PostDate";
import { MdComment } from "react-icons/md";
import ReactButton from "../../components/ui/ReactButton";
import EditPostForm from "../../components/ui/EditPostForm";
import { getOptions } from "../../components/getOptions";
import { AUTHOR_REACTIONS_COMMENTS, POSTS_URL_EXT, SOCIAL_URL_EXT, BASE_URL } from "../../components/constants/api";
import LoadingIndicator from "../../components/loading/LoadingIndicator";
import fetchPosts from "../../components/fetch/fetchPosts";
import UserComponent from "../../components/posts/cardComponents/UserComponent";
import TagsComponent from "../../components/posts/cardComponents/TagsComponent";

function PostDetail() {
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const [loading, setLoading] = useState(true);
  const [canDelete, setCanDelete] = useState(false);
  const [isMyPost, setIsMyPost] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);

  const [post, setPost] = useState([]);
  const [author, setAuthor] = useState([]);
  const [reactions, setReactions] = useState([]);
  const [tags, setTags] = useState([]);

  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);
  const { id } = useParams();

  const postDetailUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + `/${id}` + AUTHOR_REACTIONS_COMMENTS;
  const options = getOptions(auth);

  useEffect(() => {
    fetchPosts(postDetailUrl, options, setPost, setError, setLoading, setAuthor, setComments, setIsMyPost);
  }, []);

  return (
    <>
      {loading && <LoadingIndicator />}
      {showEditForm && <EditPostForm post={post} setPost={setPost} setShowEditForm={setShowEditForm} />}

      {isMyPost ? (
        <button
          onClick={() => {
            deletePost(id, auth);
          }}
        >
          Delete
        </button>
      ) : (
        ""
      )}

      <div className="posts-container">
        <Card>
          <UserComponent data={post} />
          <Link to={`/posts/${post.id}`} className="link-to-post">
            <Card.Body className="card-top">
              <h2 className="title">{post.title}</h2>
              <Card.Text>{post.body}</Card.Text>
              {post.tags && <TagsComponent post={post} />}

              {/* <div className="tags-container">
                {tags.length > 0 &&
                  tags.map((tag, index) => (
                    <div className="tag" key={tag + index}>
                      #{tag}
                    </div>
                  ))}
              </div> */}
            </Card.Body>

            <Card.Img src={!post.media ? imagePlaceholder : post.media} />
          </Link>

          <Card.Body className="bottom-container">
            <div className="comments">
              <MdComment className="comments__icon" />
              {comments ? comments.length === 0 ? <p>No comments</p> : <p>{comments.length} comments</p> : ""}
            </div>

            {post.reactions && <ReactButton post={post} />}

            {isMyPost && (
              <div>
                <button>delete</button>
                <button
                  onClick={() => {
                    setShowEditForm(true);
                  }}
                >
                  Edit
                </button>
              </div>
            )}
          </Card.Body>
          <Card.Body>{post.comments ? <Comments post={post} comments={comments} setComments={setComments} /> : ""}</Card.Body>
        </Card>
      </div>
    </>
  );
}

export default PostDetail;

// useEffect(() => {
//   async function getPostDetail() {
//     try {
//       const response = await fetch(postDetailUrl, options);

//       if (response.ok) {
//         const json = await response.json();
//         console.log(json);

//         setPost(json);
//         setAuthor(json.author);
//         console.log(json.comments);
//         setTags(json.tags);

//         setComments(json.comments);
//         setReactions(json.reactions);

//         if (json.author.name === authName) {
//           setCanDelete(true);
//           setIsMyPost(true);
//         }
//       } else {
//         setError(error.toString());
//       }
//     } catch (error) {
//       console.log(error);

//       setError(error.toString());
//     } finally {
//       setLoading(false);
//     }
//   }
//   getPostDetail();
// }, []);

{
  /* <Card.Body className="author-container">
            <div className="user-info">
              <Avatar src={author.avatar} author={author} cssClass="author-img" />
              <Link to={`/profiles/${author.name}`} className="author-name">
                By {author.name}
              </Link>
            </div>
            <PostDate date={post.created} />
          </Card.Body> */
}
