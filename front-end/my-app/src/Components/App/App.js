// imports css file
import styles from "./App.module.css";
import React, { useState, useEffect } from "react";

// other react components
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Main from "../Main/Main";

// react router
import { Routes, Route, Navigate } from "react-router-dom";

// cookies
import Cookies from "js-cookie";

function App() {
  // the state variable to be aware of the user's authorization
  const [isAuth, setIsAuth] = useState(true);

  // changes the status of the user's authorization
  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  // each time after render, useEffect checks if there is token so the user can utilize the website further
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  });

  return (
    <>
      <Routes>
        <Route
          path="/"
          element={isAuth ? <Main /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />{" "}
      </Routes>
    </>
  );
}

export default App;
