import { useState, useEffect } from "react";

import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="Navbar">
      <p>Logo</p>
      <a>Search</a>
      <a>Create</a>
      <a>Profile</a>
    </div>
  );
};

export default Navbar;
