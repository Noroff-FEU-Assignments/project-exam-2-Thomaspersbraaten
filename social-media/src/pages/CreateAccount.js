import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import logo from "../images/logo.png";
import { useEffect, useState } from "react";
import { BASE_URL } from "../components/constants/baseUrl";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import CreatePostImage from "../components/imageComponents/CreatePostImage";
import { Link, useNavigate } from "react-router-dom";

function CreateAccount() {
  const createAccountUrl = BASE_URL + "/social/auth/register";
  const [bannerUrl, setBannerUrl] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const navigate = useNavigate();
  // const emailRegEx = /\S+@\S+\.\S+/;
  // const emailRegex = new RegExp("^[^@]+@(stud\\.noroff\\.no|noroff\\.no)$");
  // const emailRegex = new RegExp("^[^@]+@(stud\\.noroff\\.no)$");
  const emailRegex = "^[^@]+@(stud\\.noroff\\.no)$";

  const nameRegex = /^[a-zA-Z0-9_]+$/;
  const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name").matches(nameRegex, "Name may only contain English letters, numbers, and underscores.").min(2, "Must be atleast two characters"),
    email: yup.string().required("Please enter your email").matches(emailRegex, "Must be a valid stud.noroff.no email"),
    banner: yup.string().optional(""),
    avatar: yup.string().optional(""),
    password: yup.string().required("Please enter a password").min(8, "must be atleast 8 characters"),
    // passwordMatches: yup.string().matches(password, "Passwords do not match"),
    passwordMatches: yup.string().oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function sendAccountInfo(data) {
    const options = {
      body: data,
    };
    console.log("login");
    console.log(data);

    // try {
    //   const response = await axios.post(createAccountUrl, data);
    //   console.log(response);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  return (
    <div>
      <div className="landing-logo-container">
        <img src={logo} className="landing-logo" />
      </div>
      <p>Sign up for an account to </p>
      <Form onSubmit={handleSubmit(sendAccountInfo)}>
        <Form.Group>
          <Form.Label className="create-post-label">
            Your name <span className="required">*</span>
          </Form.Label>
          <Form.Control type="input" {...register("name")} />
          {errors.name && <p>{errors.name.message}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label className="create-post-label">
            Your email <span className="required">*</span>
          </Form.Label>
          <Form.Control type="input" {...register("email")} />
          {errors.email && <p>{errors.email.message}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label className="create-post-label">Image for your profile banner</Form.Label>
          <Form.Control
            type="input"
            {...register("banner")}
            onChange={(e) => {
              setBannerUrl(e.target.value);
            }}
          />
          {errors.banner && <p>{errors.banner.message}</p>}
          <CreatePostImage imageUrl={bannerUrl} />
        </Form.Group>

        <Form.Group>
          <Form.Label className="create-post-label">Image for your avatar</Form.Label>
          <Form.Control
            type="input"
            {...register("avatar")}
            onChange={(e) => {
              setAvatarUrl(e.target.value);
            }}
          />
          {errors.avatar && <p>{errors.avatar.message}</p>}
          <CreatePostImage imageUrl={avatarUrl} />
        </Form.Group>

        <Form.Group>
          <Form.Label className="create-post-label">
            Password <span className="required">*</span>
          </Form.Label>
          <Form.Control type="password" {...register("password")} />
          {errors.password && <p>{errors.password.message}</p>}
        </Form.Group>

        <Form.Group>
          <Form.Label className="create-post-label">
            Confirm Password <span className="required">*</span>
          </Form.Label>
          <Form.Control type="password" {...register("passwordMatches")} />
          {errors.passwordMatches && <p>{errors.passwordMatches.message}</p>}
        </Form.Group>

        <Button type="submit">Submit</Button>
      </Form>
      {/* <div>
        <p>Already have an account?</p>
        <Link to="/login">Login here</Link>
      </div> */}
      <div className="login">
        <p>Already have an account? </p>
        <button
          className="login__button login-button"
          onClick={() => {
            navigate("/login");
          }}
        >
          Log In
        </button>
      </div>
    </div>
    // <div>
    //   <form onSubmit={handleSubmit(sendAccountInfo)}>
    //     <FormControl type="input">
    //       <InputLabel htmlFor="my-input">Your name</InputLabel>
    //       <Input id="my-input" aria-describedby="my-helper-text" {...register("name")} />
    //       {errors.name && <p>error:{errors.name.message}</p>}
    //     </FormControl>

    //     <FormControl type="input">
    //       <InputLabel htmlFor="my-input">email</InputLabel>
    //       <Input id="my-input" aria-describedby="my-helper-text" {...register("email")} />
    //       {errors.email && <p>error:{errors.email.message}</p>}
    //     </FormControl>

    //     <FormControl type="input">
    //       <InputLabel htmlFor="my-input">banner</InputLabel>
    //       <Input id="my-input" aria-describedby="my-helper-text" {...register("banner")} />
    //       {errors.banner && <p>error:{errors.banner.message}</p>}
    //     </FormControl>

    //     <FormControl type="input">
    //       <InputLabel htmlFor="my-input">Avatar</InputLabel>
    //       <Input id="my-input" aria-describedby="my-helper-text" {...register("avatar")} />
    //       {errors.avatar && <p>error:{errors.avatar.message}</p>}
    //     </FormControl>

    //     <FormControl type="input">
    //       <InputLabel htmlFor="my-input">Password</InputLabel>
    //       <Input id="my-input" aria-describedby="my-helper-text" {...register("password")} />
    //       {errors.password && <p>error:{errors.password.message}</p>}
    //     </FormControl>

    //     <button type="submit">Submit</button>
    //   </form>
    // </div>
  );
}

export default CreateAccount;
