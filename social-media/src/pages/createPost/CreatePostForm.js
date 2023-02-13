import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";

import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import ErrorMessage from "../../components/feedback/ErrorMessage";
import CreatePostImage from "../../components/imageComponents/CreatePostImage";
import { getOptions } from "../../components/getOptions";
import { BASE_URL, POSTS_URL_EXT, SOCIAL_URL_EXT } from "../../components/constants/api";

function CreatePostForm() {
  const [auth, setAuth] = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const createPostUrl = BASE_URL + SOCIAL_URL_EXT + POSTS_URL_EXT;

  async function createPost(e) {
    e.preventDefault();
    if (title.length < 1) {
      setError("Title must be atleast one character long");
      return;
    }

    const raw = {
      title: title,
      body: body,
      tags: tags,
      media: media,
    };
    const options = getOptions(auth, "POST", raw);

    try {
      const response = await fetch(createPostUrl, options);
      const json = await response.json();
      if (json.id) {
        navigate(`/posts/${json.id}`);
      } else {
        setError("An error occured, please try again.");
      }
    } catch (error) {
      setError("An error occured, please try again.");
    }
  }

  function removeTags(e) {
    const filteredTags = tags.filter((tag) => tag !== e.target.value);
    setTags(filteredTags);
  }

  function handleTags() {
    if (tagInput.length === 0) {
      setTagError("Please type something");
      return;
    }
    const checkIfTagExists = tags.includes(tagInput);
    if (checkIfTagExists) {
      setTagError("Tag already exists");
    } else {
      setTags([...tags, tagInput]);
      setTagInput("");
      setTagError(false);
    }
  }

  return (
    <Form className="create-post-form">
      <h1 className="create-post-header">Create a post</h1>
      {error && <ErrorMessage />}
      <Form.Group>
        <Form.Label className="create-post-label">Title</Form.Label>
        <Form.Control
          type="input"
          placeholder="Write a title (Required)"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label className="create-post-label">Free text</Form.Label>

        <Form.Control
          as="textarea"
          rows="5"
          // type="input"
          placeholder="Write the post text (Optional)"
          value={body}
          onChange={(e) => {
            setBody(e.target.value);
          }}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Image link</Form.Label>

        <Form.Control
          type="input"
          placeholder="Enter link to an image (Optional)"
          value={media}
          onChange={(e) => {
            setMedia(e.target.value);
          }}
        />
        <CreatePostImage imageUrl={media} />
      </Form.Group>

      <Form.Group className="create-form-tags">
        <Form.Label className="create-post-label">Tags</Form.Label>

        <div className="tags-control">
          <Form.Control
            className="create-form-tags__input"
            type="input"
            placeholder="Add some tags (Optional)"
            value={tagInput}
            onChange={(e) => {
              setTagInput(e.target.value);
            }}
          />
          {tagError && <ErrorMessage variant="warning" message={tagError} />}
        </div>

        <Button className="create-form-tags__button" onClick={handleTags}>
          Add tag
        </Button>
      </Form.Group>
      <Form.Text className="text-muted">
        <Form.Group>
          <ul className="form-tags">
            {/* BRO INSERT REMOVE TAG BUTTON on each added tag */}

            {tags.map((tag, index) => (
              <li key={tag + index} className="form-tags__tag">
                <p> {tag}</p>

                <Button value={tag} className="remove-tag" variant="danger" onClick={removeTags}>
                  X
                </Button>
              </li>
            ))}
            {/* BRO INSERT REMOVE TAG BUTTON on each added tag */}
          </ul>
        </Form.Group>
      </Form.Text>
      <div className="create-form-buttons">
        <Button onClick={goBack} className="create-form-buttons__back">
          Cancel
        </Button>
        <Button onClick={createPost} className="create-form-buttons__submit">
          Create post
        </Button>
      </div>
    </Form>
  );
}

export default CreatePostForm;
