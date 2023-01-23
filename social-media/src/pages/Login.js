import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { BASE_URL } from "../components/constants/baseUrl";
import { AuthContext } from "../components/context/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { NameContext } from "../components/context/NameContext";

function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [name, setName] = useContext(NameContext);
  const schema = yup.object().shape({
    email: yup.string().required("ok"),
    password: yup.string().required("ok"),
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
    console.log(data);
    try {
      const response = await axios.post(loginUrl, data);

      console.log(response);
      console.log(response.data.accessToken);
      setAuth(response.data.accessToken);
      setName(response.data.name);
      navigate("/home");
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <>
      {/* <form onSubmit={handleSubmit(performLogin)}>
        <FormControl type="input">
          <InputLabel htmlFor="email">Email</InputLabel>
          <Input id="email" aria-describedby="my-helper-text" {...register("email")} />
        </FormControl>

        <FormControl type="input">
          <InputLabel htmlFor="password">Password</InputLabel>
          <Input id="password" aria-describedby="my-helper-text" {...register("password")} />
        </FormControl>
        <Button variant="outlined" type="submit">
          Login
        </Button>
      </form> */}
    </>
  );
}

export default Login;

// okidokidoki@stud.noroff.no
// abcdefg1A
