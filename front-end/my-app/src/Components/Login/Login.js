import { useState, useEffect } from "react";

const Login = () => {
  const [inputs, setInputs] = useState({});

  const onChangeSetInputs = (e) => {
    console.log(e.target);
    // setInputs({username:})
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
