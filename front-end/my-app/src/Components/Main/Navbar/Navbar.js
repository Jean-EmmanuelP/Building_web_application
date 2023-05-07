import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <ul>
        <NavLink to="/" className="navLink">
          <li>
            <Icon icon="ion:home" className={styles.navIcon} />
            <p>Home</p>
          </li>
        </NavLink>
        <NavLink to="/search" className="navLink">
        <li>
          <Icon icon="ion:search" className={styles.navIcon} />
          <p>Search</p>
        </li>
        </NavLink>
        <NavLink to="/explore" className="navLink">
        <li>
          <Icon icon="ion:compass-outline" className={styles.navIcon} />
          <p>Explore</p>
        </li>
        </NavLink>
        <NavLink to="/reels" className="navLink">
        <li>
          <Icon icon="ion:play-circle-outline" className={styles.navIcon} />
          <p>Reels</p>
        </li>
        </NavLink>
        <NavLink to="/messages" className="navLink">
        <li>
          <Icon icon="ion:paper-plane-outline" className={styles.navIcon} />
          <p>Messages</p>
        </li>
        </NavLink>
        <NavLink to="/notifications" className="navLink">
        <li>
          <Icon icon="ion:heart-outline" className={styles.navIcon} />
          <p>Notifications</p>
        </li>
        </NavLink>
        <NavLink to="/create" className="navLink">
        <li>
          <Icon icon="ion:add-circle-outline" className={styles.navIcon} />
          <p>Create</p>
        </li>
        </NavLink>
        <NavLink to="/profile" className="navLink">
        <li>
          <Icon icon="ion:person-circle" className={styles.navIcon} />
          <p>Profile</p>
        </li>
        </NavLink>
      </ul>
    </div>
  );
};

export default Navbar;
