// import { Form } from "react-router-dom";
import { useContext, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import CreatePostImage from "../imageComponents/CreatePostImage";
import editPost from "./editPost";

function EditPostForm({ post, setPost, setShowEditForm }) {
  const [title, setTitle] = useState(post.title);
  const [body, setBody] = useState(post.body);
  const [tags, setTags] = useState(post.tags);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState(post.media);
  const [auth, setAuth] = useContext(AuthContext);

  const { id } = useParams();

  return (
    <div
      className="edit-modal"
      //   onClick={() => {
      //     setShowEditForm(false);
      //   }}
    >
      <Form className="create-post-form edit-form">
        <h1 className="create-post-header">Edit post</h1>
        <Form.Group>
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="input"
            placeholder="Write a title (Required)"
            defaultValue={title}
            onChange={(e) => {
              setTitle(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Body</Form.Label>
          <Form.Control
            as="textarea"
            rows="5"
            type="input"
            placeholder="Write the post text (Optional)"
            defaultValue={body}
            onChange={(e) => {
              setBody(e.target.value);
            }}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="input"
            placeholder="Write the post text (Optional)"
            defaultValue={media}
            onChange={(e) => {
              setMedia(e.target.value);
            }}
          />
          <CreatePostImage imageUrl={media} />
        </Form.Group>
        <Form.Group className="create-form-tags">
          <Form.Control
            className="create-form-tags__input"
            type="input"
            placeholder="Add some tags (Optional)"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
          />
          <Button
            className="create-form-tags__button"
            onClick={() => {
              setTags([...tags, tagInput]);
              setTagInput("");
            }}
          >
            Add tag
          </Button>
        </Form.Group>

        <Form.Text className="text-muted">
          <Form.Group>
            <ul className="form-tags">
              {/* BRO INSERT REMOVE TAG BUTTON on each added tag */}

              {tags.map((tag, index) => (
                <li key={tag + index} className="form-tags__tag">
                  {tag}
                </li>
              ))}
              {/* BRO INSERT REMOVE TAG BUTTON on each added tag */}
            </ul>
          </Form.Group>
        </Form.Text>
        <div className="create-form-buttons">
          <Button onClick={() => setShowEditForm(false)} className="create-form-buttons__back">
            Cancel
          </Button>
          <Button
            onClick={() => {
              editPost(title, body, media, tags, auth, id, setPost);
            }}
            className="create-form-buttons__submit"
          >
            Edit post
          </Button>
        </div>
      </Form>
    </div>
  );
}

export default EditPostForm;
