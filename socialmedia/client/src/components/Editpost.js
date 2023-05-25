import React, { useState, useEffect } from "react";
import "../assets/createpost.css";
import EditPost from "./utils/posts/EditPost";

export default function EditPostBox({ onClose, onCreate }, postid) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  useEffect(() => {
    if (onClose) {
    } else {
    }
  }, [onClose]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async () => {
    if (title || content) {
      await EditPost(title, content, postid);

      setTitle("");
      setContent("");
      onClose();
      window.location.reload(); 
    }
  };

  const isButtonDisabled = !(title && content); // Disable the button if either title or content is empty

  const handleClose = () => {
    onClose();
  };

  return (
    <div className="create-post-box">
      <h2>Edit Post</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={handleTitleChange}
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={handleContentChange}
      ></textarea>
      <button className="close-button" onClick={handleClose}>
        Close
      </button>
      <button
        className="create-button"
        onClick={handleSubmit}
        disabled={isButtonDisabled}
      >
        Edit
      </button>
    </div>
  );
}
