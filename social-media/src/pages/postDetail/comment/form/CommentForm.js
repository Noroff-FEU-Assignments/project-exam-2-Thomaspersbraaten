import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import { BASE_URL } from "../../../../components/constants/baseUrl";
import { AuthContext } from "../../../../components/context/AuthContext";
import Form from "react-bootstrap/Form";
import { getOptions } from "../../../../components/getOptions";
import { useParams } from "react-router-dom";

function CommentForm({ setCommentToReplyTo, setComments, comments, replying, setReplying, replyId, commentToReplyTo, referance }) {
  const [commentInput, setCommentInput] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const { id } = useParams();

  const commentUrl = BASE_URL + `/social/posts/${id}/comment`;
  async function sendCommentInfo() {
    if (commentInput.length < 1) {
      return;
    }

    const data = {
      body: commentInput,
    };
    if (replying) data.replyToId = replyId;
    // replying ? (data.replyToId = replyId) : null;
    const options = getOptions(auth, "POST", data);
    console.log(options);

    try {
      const response = await fetch(commentUrl, options);
      const json = await response.json();
      console.log(json);
      if (json.created) {
        setComments([...comments, json]);
        setCommentInput("");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form>
      <Form.Group className="comment-group">
        <Form.Label>{commentToReplyTo ? `Replying to ${commentToReplyTo.owner}` : "Comment"}</Form.Label>
        <Form.Control
          as="textarea"
          rows="3"
          ref={referance}
          id="comment"
          placeholder={commentToReplyTo ? `Type your reply here` : `Type your comment here...`}
          value={commentInput}
          onChange={(e) => {
            setCommentInput(e.target.value);
          }}
        />
        <Button onClick={sendCommentInfo} className={commentToReplyTo ? "comment-form__button reply" : "comment-form__button"}>
          {commentToReplyTo ? "Reply to comment" : "Post Comment"}
        </Button>
        {replying && (
          <Button
            onClick={() => {
              setCommentToReplyTo(null);
              setReplying(false);
            }}
          >
            Cancel Reply
          </Button>
        )}
      </Form.Group>
    </form>
  );
}

export default CommentForm;
{
  /* <FormControl type="input" className={styles.input}>
        <label htmlFor="comment">Comment</label>
        <TextField
          className={styles.textarea}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          id="comment"
          placeholder="Type your comment here..."
        ></TextField>
      </FormControl> */
}

// const myHeaders = new Headers();
// myHeaders.append("Authorization", `Bearer ${auth}`);

// myHeaders.append("Content-Type", "application/json");
// console.log(commentUrl);
// console.log("https://api.noroff.dev/api/v1/social/posts/2316/comment");

// const options = {
//   method: "POST",
//   headers: myHeaders,
//   body: raw,
//   // redirect: "follow",
// };
