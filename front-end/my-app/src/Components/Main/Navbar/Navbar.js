import React from "react";
import { Icon } from "@iconify/react";
import styles from "./Navbar.module.css";
import { NavLink } from "react-router-dom";

const nav = [
  { name: "Home", icon: "ion:home", link: "/" },
  { name: "Search", icon: "ion:search", link: "/search" },
  { name: "Explore", icon: "ion:compass-outline", link: "/explore" },
  { name: "Reels", icon: "ion:play-circle-outline", link: "/reels" },
  { name: "Messages", icon: "ion:paper-plane-outline", link: "/messages" },
  { name: "Notifications", icon: "ion:heart-outline", link: "/notifications" },
  { name: "Create", icon: "ion:add-circle-outline", link: "/create" },
  { name: "Profile", icon: "ion:person-circle", link: "/profile" },
];

const renderNavItems = (items) => {
  return nav.map((item) => (
    <NavLink to={item.link} className="navLink" key={item.name}>
      <li >
        <Icon icon={item.icon} className={styles.navIcon} />
        <p>{item.name}</p>
      </li>
    </NavLink>
  ));
};

const Navbar = () => {
  return (
    <div className={styles.Navbar}>
      <ul>{renderNavItems()}</ul>
    </div>
  );
};

export default Navbar;
