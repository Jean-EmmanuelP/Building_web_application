import { useState, useEffect } from "react";

import styles from "./Main.module.css";

import Navbar from "./Navbar/Navbar";
import Post from "./Post/Post";
import SearchBar from "./SearchBar/SearchBar";

const Main = () => {
  return (
    <div className="Main">
      <Navbar />
      <SearchBar />
      <Post />
    </div>
  );
};

export default Main;
