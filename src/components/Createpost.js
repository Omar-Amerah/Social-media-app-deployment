import React, { useState, useEffect } from "react";
import "../assets/createpost.css";
import CreatePost from "./utils/posts/CreateNewPost";

function cookies() {
  const string = decodeURIComponent(document.cookie);
  const match = string.match(/\d+/);
  if (match !== null) {
    const number = parseInt(match[0], 10);
    if (!isNaN(number)) {
      return number;
    }
  }
  return null;
}

export default function CreatePostBox({ onClose, onCreate }) {
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
    if (title && content) {
      await CreatePost(title, content, cookies());

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
      <h2>Create Post</h2>
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
        Create
      </button>
    </div>
  );
}
