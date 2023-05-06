import { useState, useEffect } from "react";
import styles from './Login.module.css';

const Login = () => {
  const [inputs, setInputs] = useState({});

  const onChangeSetInputs = (e) => {
    console.log(e.target);
    // setInputs({username:})
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
