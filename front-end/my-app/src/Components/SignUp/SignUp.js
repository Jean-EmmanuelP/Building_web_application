import Cookies from "js-cookie";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import styles from './SignUp.module.css';

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
    <>
    <div className={styles.login}>
      <div className={styles.instagram}></div>
      <h1>Sign up to see photos and videos from your friends.</h1>
      <form onSubmit={onSubmitSignUp} class={styles.signUpForm}>
        <input className={styles.input} onChange={onChangeSetInputs} type="text" name="first_name" placeholder="First name" />
        <input className={styles.input} onChange={onChangeSetInputs} type="text" name="last_name" placeholder="Last name" />
        <input className={styles.input} onChange={onChangeSetInputs} type="email" name="email" placeholder="Email" />
        <input className={styles.input} onChange={onChangeSetInputs} type="text" name="username" placeholder="Username" />
        <input className={styles.input} onChange={onChangeSetInputs} type="password" name="password" placeholder="Password" />
        <p className={styles.finePrint}>By signing up, you agree to our Terms, Privacy Policy and Cookies Policy .</p>
        <button className={styles.button} type="submit" name="sign up">
          Sign up
        </button>
      </form>
    </div>
    <div className={styles.logIn}>
      <p>Have an account? <Link to="/login">Log in</Link></p>
    </div>
    </>
  );
};

export default SignUp;
