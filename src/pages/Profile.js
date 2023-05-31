import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import GetOneUser from "../components/utils/users/GetOneUser";
import Posts from "../components/Post";
import "../assets/discover.css"

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

export default function Discover() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  

  useEffect(() => {
    const userId = cookies();
    if (userId === null) {
      navigate("/login");
    } else {
      // Fetch the user data
      async function fetchUser() {
        const response = await GetOneUser(userId);
        setUser(response);
      }
      fetchUser();
    }
  }, [navigate]);

  return (
    <>
      <Header />
      <Navbar />
      <h1>Your Profile</h1>
      {user && (
        <div>
          <h2>Name: {user.username}</h2>
          <h2>Email: {user.email}</h2>
          <h2>Following: {user.followed}</h2>
        </div>
      )}
      <Posts />
    </>
  );
}
