import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const redirect = useNavigate();
  const [inputs, setInputs] = useState({
    first_name: "",
    last_name: "",
    email: "",
    username: "",
    password: "",
  });

  const onChangeSetInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value });
  };

  const onSubmitSignUp = async (e) => {
    e.preventDefault();
    try {
      const { first_name, last_name, email, password, username } = inputs;
      if (!first_name || !last_name || !email || !username || !password)
        return console.log("All inputs are required.");

      const body = inputs;
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(
        "http://localhost:4001/api/users/signup",
        requestOptions
      );

      const parsedRes = await response.json();
      if (response.ok) {
        redirect("/login");
      } else {
        console.log(parsedRes.error);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="SignUp">
      <form onSubmit={onSubmitSignUp}>
        <h1>Sign Up</h1>
        <input onChange={onChangeSetInputs} type="text" name="first_name" />
        <input onChange={onChangeSetInputs} type="text" name="last_name" />
        <input onChange={onChangeSetInputs} type="email" name="email" />
        <input onChange={onChangeSetInputs} type="text" name="username" />
        <input onChange={onChangeSetInputs} type="password" name="password" />
        <button type="submit" name="sign up">
          Sign up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
