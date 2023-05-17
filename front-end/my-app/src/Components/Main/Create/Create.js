import React, { useState } from "react";
import Cookies from "js-cookie";
import styles from "./Create.module.css";
import Axios from "axios";

export default function Create() {
  const [file, setFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [caption, setCaption] = useState("");

  const handleImageChange = (e) => {
    setImagePreview(URL.createObjectURL(e.target.files[0]));
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(file);
    const formData = new FormData();
    formData.append("image", file);
    formData.append("title", caption);
    formData.append("userId", Cookies.get("id"));
    console.log(formData);

    Axios.post("http://localhost:4001/api/posts", formData).then((response) => {
      console.log("Axios response: ", response);
    });

    // fetch("http://localhost:4001/api/posts", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "multipart/form-data",
    //   },
    //   body: formData,
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     console.log(data);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });
  };

  return (
    <div className={styles.Create}>
      <form className={styles.createForm} onSubmit={handleSubmit}>
        <img className={styles.imageUpload} src={imagePreview} alt={caption} />
        <input
          type="file"
          id="file"
          name="file"
          accept="image/*"
          multiple={false}
          filename={imagePreview}
          onChange={handleImageChange}
        />

        <textarea
          className={styles.caption}
          rows="6"
          cols="60"
          id="caption"
          name="caption"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="Write a caption"
        />
        <button className={styles.button} type="submit">
          Share
        </button>
      </form>
    </div>
  );
}
