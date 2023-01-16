import { FormControl, InputLabel, Input } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
function CreateAccount() {
  const schema = yup.object().shape({
    name: yup.string().required("ok"),
    email: yup.string().required("ok"),
    banner: yup.string().required("ok"),
    avatar: yup.string().required("ok"),
    password: yup.string().required("ok"),
  });
  const { register } = useForm({
    resolver: yupResolver(schema),
  });
  return (
    <div>
      <form>
        <FormControl type="input">
          {/* <label>User name</label>
          <input {...register("name")} /> */}
          <InputLabel htmlFor="my-input">Your name</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" {...register("name")} />
        </FormControl>
      </form>
    </div>
  );
}

export default CreateAccount;
