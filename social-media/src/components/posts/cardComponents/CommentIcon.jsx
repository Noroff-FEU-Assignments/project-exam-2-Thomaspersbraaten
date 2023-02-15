import { MdComment } from "react-icons/md";
import { Link, useLocation, useParams } from "react-router-dom";

function CommentIcon({ post, comments }) {
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      {location.pathname === "/" && (
        <Link to={`posts/${post.id}`} className="comments">
          <MdComment className="comments__icon" />

          {!post._count.comments ? <p>0 Comments</p> : <p>{post._count.comments} Comments</p>}
        </Link>
      )}
      {location.pathname.includes("profiles") && (
        <Link to={`../../posts/${post.id}`} className="comments">
          <MdComment className="comments__icon" />

          {!post._count.comments ? <p>0 Comments</p> : <p>{post._count.comments} Comments</p>}
        </Link>
      )}
      {id && (
        <div className="comments">
          <MdComment className="comments__icon" />
          {!comments ? <p>0 Comments</p> : <p>{comments.length} Comments</p>}
        </div>
      )}
    </>
  );
}

export default CommentIcon;
