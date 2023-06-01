import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import GetOneUser from "../components/utils/users/GetOneUser";
import Posts from "../components/Post";
import "../assets/discover.css";

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
  const [postUsernames, setPostUsernames] = React.useState([]);

  async function getUsername(userId) {
    try {
      const user = await GetOneUser(userId);
      if (user) {
        const username = user.username;
        return username;
      } else {
        throw new Error(`User with ID ${userId} not found`);
      }
    } catch (error) {
      console.error(`Error fetching user: ${error.message}`);
      return "Unknown";
    }
  }

  useEffect(() => {
    const userId = cookies();
    if (userId === null) {
      navigate("/login");
    } else {
      // Fetch the user data
      async function fetchUser() {
        const response = await GetOneUser(userId);
        setUser(response);

        const usernames = [];
        for (const user of response.followed) {
          const username = await getUsername(user);
          usernames.push(username); // Remove the array brackets
        }
        setPostUsernames(usernames);
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
          <h2>Following: {postUsernames.join(", ")}</h2> {/* Add .join(", ") */}
        </div>
      )}
      <Posts />
    </>
  );
}
