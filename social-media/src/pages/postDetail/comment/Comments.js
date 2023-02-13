import UserComponent from "../../../components/posts/cardComponents/UserComponent";

import CommentForm from "./form/CommentForm";
function Comments({ post, comments, setComments }) {
  return (
    <>
      <CommentForm comments={comments} setComments={setComments} />
      <div>
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <UserComponent data={comment} />
              <p>{comment.body}</p>
            </div>
          ))}
      </div>
    </>
  );
}

export default Comments;
