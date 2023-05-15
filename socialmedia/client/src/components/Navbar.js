import React, { useState } from "react";
import "../assets/navbar.css";
import { Link, useLocation } from "react-router-dom";

export default function Header() {
  const [activeButton, setActiveButton] = useState("");
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

      <button id="createpost" className="abutton">
        Create Post
      </button>
      <button id="login" className="abutton">
        Login
      </button>
    </nav>
  );
}
