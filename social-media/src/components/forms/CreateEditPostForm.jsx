import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import Header from "../Header";
import ErrorMessage from "../feedback/ErrorMessage";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { getOptions } from "../getOptions";
import ImageChecker from "../imageComponents/ImageChecker";
import { AUTHOR, BASE_URL, COMMENTS, REACTIONS } from "../constants/baseUrl";
import TagsComponent from "../posts/cardComponents/TagsComponent";

function CreateEditPostForm({ formAction = "create", setShowEditForm, post, setPost }) {
  const [auth, setAuth] = useContext(AuthContext);
  const [creating, setCreating] = useState(true);
  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagError, setTagError] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState("");
  const navigate = useNavigate();
  const createPostUrl = BASE_URL + `posts`;
  let editPostUrl = "";
  const goBack = () => {
    navigate(-1);
  };
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setBody(post.body);
      setTags(post.tags);
      setMedia(post.media);
      editPostUrl = BASE_URL + `posts/${post.id}?${AUTHOR}&${REACTIONS}&${COMMENTS}`;
    }
  }, []);

  const raw = {
    title: title,
    body: body,
    tags: tags,
    media: media,
  };

  async function editPost() {
    if (title.length < 1) {
      setError("Title must be atleast one character long");
      return;
    }
    const editOptions = getOptions(auth, "PUT", raw);
    try {
      const response = await fetch(editPostUrl, editOptions);
      const json = await response.json();
      if (response.status === 200) {
        if (json.id) {
          setPost(json);
          setShowEditForm(false);
        }
      } else if (response.status === 429) {
        setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
      } else {
        setError("An error occured, please try again.");
      }
    } catch (error) {
      setError("An error occured, please try again.");
    }
  }

  async function createPost() {
    if (title.length < 1) {
      setError("Title must be atleast one character long");
      return;
    }
    const createOptions = getOptions(auth, "POST", raw);
    try {
      const response = await fetch(createPostUrl, createOptions);
      const json = await response.json();
      if (response.status === 200) {
        if (json.id) {
          navigate(`/posts/${json.id}`);
        }
      } else if (response.status === 429) {
        setError("You performed too many requests to the site, Please wait 30 seconds before retrying.");
      } else {
        setError("An error occured, please try again.");
      }
    } catch (error) {
      setError("An error occured, please try again.");
    }
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
    <Form className="create-post-form form">
      <div className="form-container">
        <Header size="2" cssClass="header-border-bottom">
          {formAction} a post
        </Header>
        {error && <ErrorMessage variant="danger" message={error} />}
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
          <ImageChecker imageUrl={media} />
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
          </div>

          <Button className="create-form-tags__button" onClick={handleTags}>
            Add tag
          </Button>
        </Form.Group>
        <div>{tagError && <ErrorMessage variant="warning" message={tagError} />}</div>

        <Form.Text className="text-muted">
          <Form.Group>
            <ul className="form-tags">
              {tags.map((tag, index) => (
                <li key={tag + index} className="form-tags__tag tag">
                  <TagsComponent tag={tag} tags={tags} setTags={setTags} creating={creating} />
                </li>
              ))}
            </ul>
          </Form.Group>
        </Form.Text>
        <div className="create-form-buttons">
          <Button
            onClick={() => {
              formAction === "create" ? goBack() : setShowEditForm(false);
            }}
            variant="dark"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              formAction === "create" ? createPost() : editPost();
            }}
            className="create-form-buttons__submit"
          >
            {formAction === "create" ? "Create Post" : "Edit Post"}
          </Button>
        </div>
      </div>
    </Form>
  );
}

export default CreateEditPostForm;
