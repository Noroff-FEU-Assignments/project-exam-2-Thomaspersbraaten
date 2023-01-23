import * as React from "react";

import PostDate from "../moment/PostDate";
import { Link, NavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import imagePlaceholder from "../../images/image-placeholder.png";
import avatarPlaceholder from "../../images/avatar-placeholder.png";
import ReactButton from "../ui/ReactButton";

export default function PostsCard({ post }) {
  // const [expanded, setExpanded] = React.useState(false);

  // const handleExpandClick = () => {
  //   setExpanded(!expanded);
  // if (!post.media) {
  //   post.media = imagePlaceholder;
  // }
  // if (post.tags.includes(",")) {
  //   console.log("comma");
  // }
  // console.log(post.tags);
  // return (
  //   <>
  //     <Card>
  //       <Card.Body className="author-container">
  //         <div className="user-info">
  //           <img src={!post.author.avatar ? avatarPlaceholder : post.author.avatar} className="author-img" />
  //           <Link to={`/profiles/${post.author.name}`} className="author-name">
  //             {post.author.name}
  //           </Link>
  //         </div>
  //         <PostDate date={post.created} />
  //       </Card.Body>
  //       <Card.Body className="card-top">
  //         <Card.Title className="title">{post.title}</Card.Title>
  //         <Card.Text>{post.body}</Card.Text>
  //         <div className="tags-container">
  //           {post.tags.map((tag, index) => (
  //             <div className="tag" key={tag + index}>
  //               {tag}
  //             </div>
  //           ))}
  //         </div>
  //       </Card.Body>
  //       <Card.Img src={!post.media ? imagePlaceholder : post.media} />

  //       <Card.Body>
  //         <Card.Link href="#">{post._count.comments} Comments</Card.Link>
  //         <Card.Link href="#">{post._count.reactions} Reactions</Card.Link>
  //       </Card.Body>
  //     </Card>
  //   </>
  //
  // console.log(post.tags[0]);

  if (post.tags.length === 1 && post.tags[0] === "") {
    post.tags = [];
  }
  return (
    <>
      <Card>
        <Card.Body className="author-container">
          <div className="user-info">
            <img src={!post.author.avatar ? avatarPlaceholder : post.author.avatar} className="author-img" />
            <Link to={`/profiles/${post.author.name}`} className="author-name">
              {post.author.name}
            </Link>
          </div>
          <PostDate date={post.created} />
        </Card.Body>
        <Link to={`posts/${post.id}`} className="link-to-post">
          <Card.Body className="card-top">
            <Card.Title className="title">{post.title}</Card.Title>
            <Card.Text>{post.body}</Card.Text>
            <div className="tags-container">
              {post.tags.map((tag, index) => (
                <div className="tag" key={tag + index}>
                  {tag}
                </div>
              ))}
            </div>
          </Card.Body>
          <Card.Img src={!post.media ? imagePlaceholder : post.media} />
        </Link>

        <Card.Body className="bottom-container">
          <Card.Link href="#">{post._count.comments} Comments</Card.Link>
          <ReactButton post={post} />
        </Card.Body>
      </Card>
    </>
  );
}
