import styles from "./Main.module.css";

import Navbar from "./Navbar/Navbar";
import Posts from "./Posts/Posts";
import Stories from "./Stories/Stories"
import Profile from "./Profile/Profile"

const Main = () => {
  return (
    <div className={styles.Main}>
      <Navbar className={styles.Navbar} />
      <Stories className={styles.Stories} />
      <Posts className={styles.Post} />
      <Profile className={styles.Profile} />
    </div>
  );
};

export default Main;
