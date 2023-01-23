// import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";
import PostDate from "../../../components/moment/PostDate";
import styles from "./Comments.module.css";
function Comments({ comment }) {
  return (
    <div className={styles.container}>
      <div className={styles.topContainer}>
        <div className={styles.author}>
          {/* <Avatar src={comment.author.avatar}></Avatar> */}
          <div className={styles.commentBy}>
            <div>Comment by</div>
            <Link to={`/profiles/${comment.author.name}`}>{comment.author.name}</Link>
          </div>
        </div>
        <div className={`${styles}.posted-date`}>
          <PostDate date={comment.created} />
        </div>
      </div>
      <div>{comment.body}</div>
    </div>
  );
}

export default Comments;
