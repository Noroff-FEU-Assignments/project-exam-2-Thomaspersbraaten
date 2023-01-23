import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../../../components/constants/baseUrl";
import { AuthContext } from "../../../../components/context/AuthContext";
import styles from "./CommentForm.module.css";

function CommentForm({ id, setComments, comments }) {
  const [comment, setComment] = useState("");
  const [auth, setAuth] = useContext(AuthContext);

  const commentUrl = BASE_URL + `/social/posts/${id}/comment`;
  async function sendCommentInfo() {
    if (comment.length < 1) {
      return;
    }
    const stringifiedBody = JSON.stringify({
      body: comment,
    });

    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: stringifiedBody,
    };

    try {
      const response = await fetch(commentUrl, options);
      const json = await response.json();
      console.log(response);
      console.log(json);
      setComments([...comments, json]);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <form className={styles.form}>
      {/* <FormControl type="input" className={styles.input}>
        <label htmlFor="comment">Comment</label>
        <TextField
          className={styles.textarea}
          onChange={(e) => {
            setComment(e.target.value);
          }}
          id="comment"
          placeholder="Type your comment here..."
        ></TextField>
      </FormControl>
      <Button onClick={sendCommentInfo} className={styles.button} variant="contained">
        Post Comment
      </Button> */}
    </form>
  );
}

export default CommentForm;

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
