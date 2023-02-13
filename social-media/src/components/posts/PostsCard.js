import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import imagePlaceholder from "../../images/image-placeholder.png";
import ReactButton from "../ui/ReactButton";
import { MdComment } from "react-icons/md";
import UserComponent from "./cardComponents/UserComponent";
import TagsComponent from "./cardComponents/TagsComponent";

export default function PostsCard({ post, postType = "home", referance }) {
  return (
    <Card ref={referance}>
      <UserComponent data={post} />
      <Link to={`/posts/${post.id}`} className="link-to-post">
        <Card.Body className="card-top">
          <h2 className="title">{post.title}</h2>
          <Card.Text>{post.body}</Card.Text>
          <TagsComponent post={post} />
        </Card.Body>
        <Card.Img src={!post.media ? imagePlaceholder : post.media} />
      </Link>

      <Card.Body className="bottom-container">
        {postType === "detail" ? (
          <div className="comments">
            <MdComment className="comments__icon" />
            <p>{post._count.comments} Comments</p>
          </div>
        ) : (
          <Link to={`posts/${post.id}`} className="comments">
            <MdComment className="comments__icon" />
            <p>{post._count.comments} Comments</p>
          </Link>
        )}

        <ReactButton post={post} />
      </Card.Body>
    </Card>
  );
}

{
  /* <Card.Body className="author-container">
          <div className="user-info">
            <Avatar src={post.author.avatar} author={post.author} cssClass="author-img" />
            <Link to={`/profiles/${post.author.name}`} className="author-name">
              By {post.author.name}
            </Link>
          </div>
          <PostDate date={post.created} />
        </Card.Body> */
}
{
  /* <div className="tags-container">
              {post.tags.map((tag, index) => (
                <div className="tag" key={tag + index}>
                  #{tag}
                </div>
              ))}
            </div> */
}
