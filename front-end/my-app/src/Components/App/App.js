import React, { useState, useEffect } from "react";

// other react components
import Login from "../Login/Login";
import SignUp from "../SignUp/SignUp";
import Main from "../Main/Main";
import Create from "../Main/Create/Create";
import RootLayout from "../../Layouts/RootLayout";

// cookies
import Cookies from "js-cookie";

// react router
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";



function App() {
  // the state variable to be aware of the user's authorization
  const [isAuth, setIsAuth] = useState(false);

  // changes the status of the user's authorization
  const setAuth = (boolean) => {
    setIsAuth(boolean);
  };

  // each time after render, useEffect checks if there is token
  useEffect(() => {
    const token = Cookies.get("token");
    if (!token) {
      setAuth(false);
    } else {
      setAuth(true);
    }
  });

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<RootLayout />}>
        <Route index element={isAuth ? <Main /> : <Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/create" element={<Create />} />
      </Route>
    )
  );

  return (
    <RouterProvider router={router} />
  )
}

export default App;
