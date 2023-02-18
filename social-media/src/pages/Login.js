import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../components/constants/baseUrl";
import { AuthContext } from "../components/context/AuthContext";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../components/context/NameContext";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";

import ErrorMessage from "../components/feedback/ErrorMessage";

function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [authName, setAuthName] = useContext(NameContext);
  const [error, setError] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const schema = yup.object().shape({
    email: yup.string().required("Please input a valid email adress"),
    password: yup.string().required(),
  });

  const loginUrl = BASE_URL + "/social/auth/login";
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  async function performLogin(data) {
    setSubmitting(true);
    try {
      const response = await axios.post(loginUrl, data);

      console.log(response);
      console.log(response.data.accessToken);
      setAuth(response.data.accessToken);
      setAuthName(response.data.name);
      navigate("/");
    } catch (error) {
      console.log(error);
      if (error.response.status === 401) {
        setError("Email and Password do not match");
      } else {
        setError("Something went wrong, Please try again");
      }
    } finally {
      setSubmitting(false);
    }
  }
  return (
    <Container className="login-container">
      <Form onSubmit={handleSubmit(performLogin)} className="login-form">
        <p>Use your email and password to login below</p>
        {error && <ErrorMessage message={error} variant="danger" />}
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control placeholder="name@example.com" value="okidokidoki@stud.noroff.no" {...register("email")} />
          {errors.email && <ErrorMessage message={errors.email.message} variant="warning" />}
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control value="abcdefg1A" type="password" {...register("password")} />
        </Form.Group>
        <Button type="submit" className="login-button">
          {submitting ? "Logging in" : "Log in"}
        </Button>
      </Form>
      <div className="signup">
        <p>Dont have an account?</p>
        <button
          className="signup__button"
          onClick={() => {
            navigate("/create-account");
          }}
        >
          Sign Up
        </button>
      </div>
    </Container>
  );
}

export default Login;

// okidokidoki@stud.noroff.no
// abcdefg1A
