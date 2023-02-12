import * as React from "react";

import PostDate from "../moment/PostDate";
import { Link, NavLink } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Placeholder from "react-bootstrap/Placeholder";
import imagePlaceholder from "../../images/image-placeholder.png";
import avatarPlaceholder from "../../images/avatar-placeholder.png";
import ReactButton from "../ui/ReactButton";
import { MdComment } from "react-icons/md";
import Avatar from "../imageComponents/Avatar";
export default function PostsCard({ post, postType = "home" }) {
  return (
    <>
      <Card>
        <Card.Body className="author-container">
          <div className="user-info">
            <Avatar src={post.author.avatar} author={post.author} cssClass="author-img" />
            <Link to={`/profiles/${post.author.name}`} className="author-name">
              By {post.author.name}
            </Link>
          </div>
          <PostDate date={post.created} />
        </Card.Body>
        <Link to={`/posts/${post.id}`} className="link-to-post">
          <Card.Body className="card-top">
            <h2 className="title">{post.title}</h2>
            <Card.Text>{post.body}</Card.Text>
            <div className="tags-container">
              {post.tags.map((tag, index) => (
                <div className="tag" key={tag + index}>
                  #{tag}
                </div>
              ))}
            </div>
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
    </>
  );
}
