// imports css file
import "./App.css";
import React, { useState, useEffect, use } from "react";

// other react components
import Login from "../Login/Login";
import SignUp from '../SignUp/SignUp';

// react router
import { Routes, Route, Navigate } from "react-router-dom";

// cookies
import Cookies from "js-cookie";

function App() {
  // the state variable to be aware of the user's authorization
  const [isAuth, setIsAuth] = useState(false);

  // changes the status of the user's authorization
  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  // each time after render, useEffect checks if there is token so the user can utilize the website further
  useEffect(() => {
    const token = Cookies.get("token");
    console.log(token);
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  });

  return (
    <>
    <Routes>
      <Route path="/" element={isAuth ? <p>Main</p> : <Login />} />
      {/* <Route path="/signup" element={<p>SignUp</p>} /> */}
    </Routes>
    <SignUp />
    </>
  );
}

export default App;
