import React, { useState } from "react";
import styles from "./Create.module.css";

export default function Create() {
  const [image, setImage] = useState("");
  const [caption, setCaption] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const image = e.target.image.value;
    const caption = e.target.caption.value;

    const post = {
      image: image,
      caption: caption,
    };

    fetch("http://localhost:4001/api/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(post),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className={styles.Create}>
      {/* form for creating a post */}
      <form className={styles.createForm} onSubmit={handleSubmit}>
        <input type="file" id="image" name="image" value={image} onChange={(e) => setImage(e.currentTarget.value)} />
        <textarea className={styles.caption} rows="6" cols="60" id="caption" name="caption" value={caption} onChange={(e) => setCaption(e.currentTarget.value)} placeholder="Write a caption" />
        <button className={styles.button} type="submit">Share</button>
      </form>
    </div>
  );
}
