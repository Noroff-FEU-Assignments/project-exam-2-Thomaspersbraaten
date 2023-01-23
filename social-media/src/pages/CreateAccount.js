import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect } from "react";
import { BASE_URL } from "../components/constants/baseUrl";
import axios from "axios";
function CreateAccount() {
  const createAccountUrl = BASE_URL + "/social/auth/register";
  console.log(createAccountUrl);
  const schema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup.string().required("ok"),
    banner: yup.string().required("ok"),
    avatar: yup.string().required("ok"),
    password: yup.string().required("ok"),
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

    try {
      const response = await axios.post(createAccountUrl, data);
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <></>
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
