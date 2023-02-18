import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import imagePlaceholder from "../../images/image-placeholder.png";
import ReactButton from "./cardComponents/ReactButton";
import UserComponent from "./cardComponents/UserComponent";
import TagsComponent from "./cardComponents/TagsComponent";
import Comments from "../../pages/postDetail/comment/Comments";
import EditAndDeletePost from "./cardComponents/EditAndDeletePost";
import CommentIcon from "./cardComponents/CommentIcon";
import TitleBodyImage from "./cardComponents/TitleBodyImage";

export default function PostsCard({ post, referance, comments, setComments, isMyPost, setShowEditForm, showEditForm }) {
  return (
    <Card ref={referance}>
      {isMyPost && <EditAndDeletePost setShowEditForm={setShowEditForm} showEditForm={showEditForm} />}
      <UserComponent data={post} />
      <TitleBodyImage post={post} />
      {/* <Link to={`/posts/${post.id}`} className="link-to-post">
        <Card.Body className="card-top">
          <h2 className="title">{post.title}</h2>
          <Card.Text>{post.body}</Card.Text>
          <ul className="tags-container">
            {post.tags &&
              post.tags.map((tag, index) => (
                <li className="tag" key={tag + index}>
                  <TagsComponent post={post} tag={tag} />
                </li>
              ))}
          </ul>
        </Card.Body>
        <Card.Img src={!post.media ? imagePlaceholder : post.media} />
      </Link> */}

      <Card.Body className="bottom-container">
        <CommentIcon post={post} comments={comments} />
        <ReactButton post={post} />
      </Card.Body>
      {post.comments ? (
        <Card.Body>
          <Comments post={post} comments={comments} setComments={setComments} />
        </Card.Body>
      ) : (
        ""
      )}
    </Card>
  );
  // console.log(location);
  // console.log(typeof post._count.comments);

  // const [auth, setAuth] = useContext(AuthContext);
  // const [author, setAuthor] = useState([]);
  // const [reactions, setReactions] = useState([]);

  // const [comments, setComments] = useState([]);
  // const postDetailUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT + `/${id}` + AUTHOR_REACTIONS_COMMENTS;
  // const options = getOptions(auth);
  // const [loading, setLoading] = useState(true);
  // const [showEditForm, setShowEditForm] = useState(false);
  // const [error, setError] = useState(null);
  // const { id } = useParams();
  // const [isMyPost, setIsMyPost] = useState(false);

  // useEffect(() => {
  //   fetchPosts(postDetailUrl, options, setPost, setError, setLoading, setAuthor, setComments, setIsMyPost);
  // }, []);
  {
    /* {location.pathname === "/" ? (
          <Link to={`posts/${post.id}`} className="comments">
            <MdComment className="comments__icon" />

            {post._count.comments && <p>ok</p>}
          </Link>
        ) : (
          <div className="comments">
            <MdComment className="comments__icon" />

            {comments && <p>{comments.length} Comments</p>}
          </div>
        )} */
  }
  {
    /* {location.pathname === "/" ?  {post._count.comments && <p>ok</p>} : "p"} */
  }
}
{
  /* {post._count.comments && <p>{post._count.comments.length} Commentss</p>}

             */
}
{
  /* {location === "/" ? (
          <div className="comments">
            <MdComment className="comments__icon" />
            {post.comments && <p>{comments.length} Comments</p>}
          </div>
        ) : (
          <Link to={`posts/${post.id}`} className="comments">
            <MdComment className="comments__icon" />
            {post.comments && <p>{comments.length} Comments</p>}
          </Link>
        )} */
}
{
  /* <div className="comments">
          <MdComment className="comments__icon" />
          {post.comments && <p>{post.comments.length} Comments</p>}
        </div> */
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
