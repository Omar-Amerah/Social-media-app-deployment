import React, { useEffect } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Post from "../components/Post";
import { useNavigate } from "react-router-dom";

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

export default function Home() {
  const navigate = useNavigate();

  useEffect(() => {
    const userId = cookies();
    if (userId === null) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Navbar />
      <Post type="Home" />
    </>
  );
}
