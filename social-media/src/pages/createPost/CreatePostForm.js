import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useContext, useState } from "react";
import { AuthContext } from "../../components/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../components/constants/baseUrl";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import ErrorMessage from "../../components/feedback/ErrorMessage";
import CreatePostImage from "../../components/imageComponents/CreatePostImage";

function CreatePostForm() {
  const [auth, setAuth] = useContext(AuthContext);

  const [error, setError] = useState(false);
  const [inputError, setInputError] = useState(false);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [media, setMedia] = useState("");
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  const createPostUrl = BASE_URL + "/social/posts";
  // const schema = yup.object().shape({
  //   title: yup.string().required("ok"),
  //   body: yup.string().optional("ok"),
  //   // tags: yup.array().of(yup.string().optional("ok")),
  //   // tags: yup.array().of(yup.string()).nullable().optional("ok"),
  //   // tags: yup.array().of([yup.string().optional("ok")]),
  //   tags: yup.string().optional("ok"),
  //   media: yup.string().optional("ok"),
  // });

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: yupResolver(schema),
  // });

  async function createPost(e) {
    e.preventDefault();
    if (title.length < 1) {
      setError("Title must be atleast one character long");
      return;
    }

    const raw = JSON.stringify({
      title: title,
      body: body,
      tags: tags,
      media: media,
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${auth}`,
        "Content-Type": "application/json",
      },
      body: raw,
    };
    console.log(requestOptions);

    // try {
    //   const response = await fetch(createPostUrl, requestOptions);
    //   const json = await response.json();
    //   console.log(json);
    //   if (json) {
    //     navigate("/");
    //   }
    // }
    try {
      console.log("l");

      // navigate("/");
    } catch (error) {
      console.log("OK AN ERROR BRO", error);
    }
  }

  return (
    <Form className="create-post-form">
      <h1 className="create-post-header">Create a post</h1>
      {error && <ErrorMessage />}
      <Form.Group>
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
        <Button onClick={goBack} className="create-form-buttons__back">
          Cancel
        </Button>
        <Button onClick={createPost} className="create-form-buttons__submit">
          Create post
        </Button>
      </div>

      {/* <FormControl type="input">
        <Form.Label>Email address</Form.Label>
        <Input
          onChange={(e) => {
            setTags([e.target.value]);
          }}
          variant="outline"
          id="tags"
          aria-describedby="my-helper-text"
        />
      </FormControl> */}
      {/* <FormControl type="input">
        <InputLabel htmlFor="title">Post title</InputLabel>
        <Input
          onChange={(e) => {
            setTitle(e.target.value);
          }}
          variant="outline"
          id="title"
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl type="input">
        <InputLabel htmlFor="body">Text</InputLabel>
        <Input
          onChange={(e) => {
            setBody(e.target.value);
          }}
          variant="outline"
          id="body"
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl type="input">
        <InputLabel htmlFor="tags">Tags</InputLabel>
        <Input
          onChange={(e) => {
            setTags([e.target.value]);
          }}
          variant="outline"
          id="tags"
          aria-describedby="my-helper-text"
        />
      </FormControl>

      <FormControl type="input">
        <InputLabel htmlFor="media">Image Link</InputLabel>
        <Input
          onChange={(e) => {
            setMedia(e.target.value);
          }}
          variant="outline"
          id="media"
          aria-describedby="my-helper-text"
        />
      </FormControl> */}

      {/* <Button onClick={createPost} variant="outlined" type="submit">
        submit
      </Button> */}
    </Form>
  );

  // YUP
  // return (
  //   <form onSubmit={handleSubmit(createPost)}>
  //     <FormControl type="input">
  //       <InputLabel htmlFor="title">Post title</InputLabel>
  //       <Input variant="outline" id="title" aria-describedby="my-helper-text" {...register("title")} />
  //       {errors.title && <p>error:{errors.title.message}</p>}
  //     </FormControl>

  //     <FormControl type="input">
  //       <InputLabel htmlFor="body">Text</InputLabel>
  //       <Input variant="outline" id="body" aria-describedby="my-helper-text" {...register("body")} />
  //       {errors.body && <p>error:{errors.body.message}</p>}
  //     </FormControl>

  //     <FormControl type="input">
  //       <InputLabel htmlFor="tags">Tags</InputLabel>
  //       <Input variant="outline" id="tags" aria-describedby="my-helper-text" {...register("tags")} />
  //       {errors.tags && <p>error:{errors.tags.message}</p>}
  //     </FormControl>

  //     <FormControl type="input">
  //       <InputLabel htmlFor="media">Image Link</InputLabel>
  //       <Input variant="outline" id="media" aria-describedby="my-helper-text" {...register("media")} />
  //       {errors.media && <p>error:{errors.media.message}</p>}
  //     </FormControl>

  //     <Button variant="outlined" type="submit">
  //       submit
  //     </Button>
  //   </form>
  // );
}

export default CreatePostForm;

// var myHeaders = new Headers();
// myHeaders.append(
//   "Authorization",
//   "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NTQyLCJuYW1lIjoiaGVsbG9icm9vIiwiZW1haWwiOiJva2V5Lm1hbkBzdHVkLm5vcm9mZi5ubyIsImF2YXRhciI6IiIsImJhbm5lciI6IiIsImlhdCI6MTY3MzU0NzQxOX0.TAIalkx0gBFiKRXBlGa3KpyfvTAo7AEkHZlz3yK7yiY"
// );
// myHeaders.append("Content-Type", "application/json");
// const raw = JSON.stringify({ data }); yup
// fetch("https://api.noroff.dev/api/v1/social/posts", requestOptions)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));

//   const options = {
//     // method: "POST",
//     headers: {
//       Authorization: `Bearer ${auth}`,
//       "Content-Type": "application/json",
//       // header: {
//       //   "Content-Type": "application/json",
//       // },
//     },
//     body: raw,
//     redirect: "follow",
//   };
//   console.log(options);
//   // console.log(data);
//   try {
//     // const response = await fetch(createPostUrl, options);
//     const response = await axios.post("https://api.noroff.dev/api/v1/social/posts", options);

//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
