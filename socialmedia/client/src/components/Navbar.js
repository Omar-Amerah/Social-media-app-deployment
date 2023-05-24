import React, { useState } from "react";
import "../assets/navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import CreatePostBox from "./Createpost";
import ClearCookies from "./utils/users/ClearCookies";

export default function Navbar() {
  const [activeButton, setActiveButton] = useState("");
  const [showCreatePost, setShowCreatePost] = useState(false);
  const navigate = useNavigate();

  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case "/":
        setActiveButton("Home");
        break;
      case "/discover":
        setActiveButton("Discover");
        break;
      case "/profile":
        setActiveButton("Profile");
        break;
      default:
        setActiveButton("");
    }
  }, [location]);

  const handleCreatePostClick = () => {
    setShowCreatePost(true);
    document.body.classList.add("overlay-active");
  };

  const handleCloseCreatePost = () => {
    setShowCreatePost(false);
    document.body.classList.remove("overlay-active");
  };

  const handleCreatePost = (title, content) => {
    // Handle the creation of the post (e.g., make an API call)
  };

  const handleLogout = () => {
    ClearCookies();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link
        to="/"
        style={{ display: "block", height: "100%" }}
        onClick={() => setActiveButton("Home")}
      >
        <button
          className={`abutton ${activeButton === "Home" ? "active" : ""}`}
        >
          Home
        </button>
      </Link>

      <Link
        to="/discover"
        style={{ display: "block", height: "100%" }}
        onClick={() => setActiveButton("Discover")}
      >
        <button
          className={`abutton ${
            activeButton === "Discover" ? "active" : ""
          }`}
        >
          Discover
        </button>
      </Link>

      <Link
        to="/profile"
        style={{ display: "block", height: "100%" }}
        onClick={() => setActiveButton("Profile")}
      >
        <button
          className={`abutton ${activeButton === "Profile" ? "active" : ""}`}
        >
          Profile
        </button>
      </Link>

      <button
        id="createpost"
        className="abutton"
        onClick={handleCreatePostClick}
      >
        Create Post
      </button>
      <button id="login" className="abutton" onClick={handleLogout}>
        Log Out
      </button>

      {showCreatePost && (
        <>
          
          <CreatePostBox
            onClose={handleCloseCreatePost}
            onCreate={handleCreatePost}
          />
          <div className="overlay" />
        </>
      )}
    </nav>
  );
}
