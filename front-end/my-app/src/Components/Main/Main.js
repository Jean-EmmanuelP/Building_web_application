import styles from "./Main.module.css";

import Navbar from "./Navbar/Navbar";
import Post from "./Post/Post";
import Stories from "./Stories/Stories"
import Profile from "./Profile/Profile"

const Main = () => {
  return (
    <div className={styles.Main}>
      <Navbar className={styles.Navbar} />
      <Stories className={styles.Stories} />
      <Post className={styles.Post} />
      <Profile className={styles.Profile} />
    </div>
  );
};

export default Main;
