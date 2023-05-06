import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const Login = () => {
  const redirect = useNavigate();
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const onChangeSetInputs = (e) => {
    setInputs({...inputs, [e.target.name]: e.target.value});
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
        console.log(parsedRes);
        Cookies.set("token", parsedRes.token);
        Cookies.set("id", parsedRes.user.id);
        Cookies.set("first_name", parsedRes.user.first_name);
        Cookies.set("last_name", parsedRes.user.last_name);
        Cookies.set("email", parsedRes.user.email);
        redirect("/");
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  return (
    <div className={styles.login}>
      <div className={styles.instagram}></div>
      <form onChange={onChangeSetInputs} className={styles.loginForm}>
        <input className={styles.input} type="email" name="email" placeholder="Email" />
        <input className={styles.input} type="password" name="password" placeholder="Password" />
        <button className={styles.button} type="submit" name="login">
          Log in
        </button>
      </form>
      <a href="#" className={styles.forgotPass}>Forgot password?</a>
    </div>
  );
};

export default Login;
