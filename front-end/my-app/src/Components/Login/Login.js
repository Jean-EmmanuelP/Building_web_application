import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const redirect = useNavigate();
  const [inputs, setInputs] = useState({});

  const onChangeSetInputs = (e) => {
    console.log(e.target);
  };

  const onSubmitLogin = async (e) => {
    e.preventDefault();
    try {
      const { email, password } = inputs;
      if (!email || !password) return console.log("All inputs are required.");

      const body = { email, password };
      const requestOptions = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(body),
      };
      const response = await fetch(
        "http://localhost:4001/api/users/login",
        requestOptions
      );
      const parsedRes = await response.json();
      if (response.ok) {
        Cookies.set("token", parsedRes.token);
        Cookies.set("id", parsedRes.user.id);
        Cookies.set("first_name", parsedRes.user.first_name);
        Cookies.set("last_name", parsedRes.user.last_name);
        Cookies.set("email", parsedRes.user.email);
        redirect("/");
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onChange={onChangeSetInputs}>
        <input type="email" name="email" />
        <input type="password" name="password" />
        <button type="submit" name="login">
          Log in
        </button>
      </form>
    </div>
  );
};

export default Login;