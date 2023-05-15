import styles from "./Posts.module.css";
import { useSelector } from "react-redux";
import { selectPosts } from "./postsSlice";
import { Icon } from "@iconify/react";

export default function Posts() {
  const posts = useSelector(selectPosts);

  return (
    <div className={styles.Posts}>
      <ul className={styles.PostList}>
        {Object.values(posts).map((post) => (
          <li className={styles.singlePost} key={post.id}>
            <div className={styles.header}>
              <img
                src={post.avatar}
                className={styles.avatar}
                alt={`Avatar for ${post.user}`}
              />
              <h2>{post.user}</h2>
            </div>
            <img src={post.src} alt={post.description} />
            <div className={styles.footer}>
              <ul className={styles.actions}>
                <li>
                  <Icon icon="ion:heart-outline" className={styles.icon} />
                  {/* Like handler */}
                </li>
                <li>
                  <Icon icon="ion:chatbubble-outline" className={styles.icon} />
                  {/* Add comment */}
                </li>
                <li>
                  <Icon
                    icon="ion:paper-plane-outline"
                    className={styles.icon}
                  />
                  {/* Share handler */}
                </li>
              </ul>
              <p>
              <span className={styles.user}>{post.user}</span> {post.caption}
              </p>
              <ul className={styles.comments}>
                {Object.values(post.comments).map((comment) => (
                  <li className={styles.singleComment} key={comment.id}>
                    <p>
                      <span className={styles.commentUser}>{comment.user}</span> {comment.comment}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
