import { useRef, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import UserComponent from "../../../components/posts/cardComponents/UserComponent";
import CommentBody from "./CommentBody";

import CommentForm from "./form/CommentForm";
function Comments({ post, comments, setComments }) {
  console.log(comments);
  const [showReplyInput, setShowReplyInput] = useState(false);
  const [replying, setReplying] = useState(false);
  const [replyId, setReplyId] = useState("");
  const [commentToReplyTo, setCommentToReplyTo] = useState(null);
  const scrollRef = useRef(null);

  function scrollToElement() {
    scrollRef.current.scrollIntoView({ behavior: "smooth" });
    const elementTop = scrollRef.current.getBoundingClientRect().top;
    const windowCenter = window.innerHeight / 2;
    const scrollTo = elementTop - windowCenter + window.pageYOffset;
    window.scrollTo({
      top: scrollTo,
      behavior: "smooth",
    });
  }
  return (
    <>
      <CommentForm
        comments={comments}
        setComments={setComments}
        replying={replying}
        setCommentToReplyTo={setCommentToReplyTo}
        setReplying={setReplying}
        replyId={replyId}
        commentToReplyTo={commentToReplyTo}
        referance={scrollRef}
      />
      <div>
        {comments &&
          comments.map((comment) => (
            <div className="comment" key={comment.id}>
              <UserComponent data={comment} />
              {/* {comment.replyToId ? ` @${comment.owner} - ${comment.body} ` : <p>{comment.body}</p>} */}
              {comments && <CommentBody comments={comments} comment={comment} />}
              <Button
                value={comment.id}
                // variant="outline-secondary"
                variant="outline-dark"
                className="reply-comment-button"
                onClick={() => {
                  scrollToElement();
                  setReplyId(comment.id);
                  setReplying(true);
                  setCommentToReplyTo(comment);
                }}
              >
                Reply
              </Button>
            </div>
          ))}
      </div>
    </>
  );
}

export default Comments;
