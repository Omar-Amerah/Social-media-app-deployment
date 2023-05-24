import React from "react";
import "../assets/post.css";
import GetAllPosts from "./utils/posts/GetAllPosts";
import GetUserPosts from "./utils/posts/GetUserPosts";
import DeletePost from "./utils/posts/DeletePost";
import GetOneUser from "./utils/users/GetOneUser";
import FollowUser from "./utils/users/FollowUser";
import FollowedPosts from "./utils/posts/FollowedPosts";
import LikeUser from "./utils/users/LikePost";

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

export default function Posts({ type }) {
  const [posts, setPosts] = React.useState([]);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [username, setUsername] = React.useState("");
  const [followedUsers, setFollowedUsers] = React.useState([]);

  async function getUsername(UserId) {
    const user = await GetOneUser(UserId);
    const username = user.username;
    setUsername(username);
    return null;
  }

  React.useEffect(() => {
    async function fetchData() {
      let response;
      if (type === "Discover") {
        response = await GetAllPosts();
        const followedUsers = (await GetOneUser(cookies())).followed;
        setFollowedUsers(followedUsers);
      } else if (type === "Home") {
        const userId = cookies(); // Retrieve the user ID from cookies
        response = await FollowedPosts(userId);
        const followedUsers = (await GetOneUser(cookies())).followed;
        setFollowedUsers(followedUsers);
      } else {
        response = await GetUserPosts(cookies());
        response = response;
      }
      setPosts(response);
    }
    fetchData();
  }, [type]);

  function handlePostClick(post) {
    document.body.classList.add("lock-scrolling");
    setSelectedPost(post);
  }

  async function handleDeleteClick(event, id) {
    document.body.classList.remove("lock-scrolling");
    event.stopPropagation(); // Stop event propagation
    await DeletePost(id);
    window.location.reload();
  }

  function handleCloseClick() {
    document.body.classList.remove("lock-scrolling");
    setSelectedPost(null);
  }

  async function handleLikeClick(event, UserId) {
    event.stopPropagation(); 
    await LikeUser(UserId, cookies())
  }

  async function handleFollowClick(event, UserId) {
    event.stopPropagation();
    if (followedUsers.includes(UserId)) {
      // Unfollow the user
      await FollowUser(UserId, cookies());
    } else {
      // Follow the user
      await FollowUser(UserId, cookies());
    }
    // Update the followed users array
    const updatedFollowedUsers = (await GetOneUser(cookies())).followed;
    setFollowedUsers(updatedFollowedUsers);
  }

  if (!posts || posts.length === 0) {
    // Render an alternative UI or display a message when no posts are found
    return null;
  }

  return (
    <div>
      {selectedPost && (
        <div className={`post selected`}>
          <h2 className="title">{selectedPost.title}</h2>
          {(type === "Discover" || type === "Home") && (
            <p className="creator">Creator: {selectedPost.UserId}</p>
          )}
          <p className="content">{selectedPost.content}</p>
          <p className="date">Date: {selectedPost.postdate}</p>
          {(type === "Discover" || type === "Home") && (
            <div className="actions">
              <button className="like" onClick={(event) => handleLikeClick(event, selectedPost.UserId)}>
                Like
              </button>
              <button
                className={`follow ${followedUsers.includes(selectedPost.UserId) ? "unfollow" : ""}`}
                onClick={(event) => handleFollowClick(event, selectedPost.UserId)}
              >
                {followedUsers.includes(selectedPost.UserId) ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
          {type !== "Discover" && type !== "Home" && (
            <button
              className="delete"
              onClick={(event) => handleDeleteClick(event, selectedPost.id)}
            >
              Delete
            </button>
          )}
          <button className="close" onClick={handleCloseClick}>
            Close
          </button>
        </div>
      )}
      <div className="post-container">
        {posts.map((post) => {
          if (post === selectedPost) {
            return null;
          }
          return (
            <div
              key={post.id}
              className={`post ${selectedPost === post ? "selected" : ""}`}
              onClick={() => handlePostClick(post)}
            >
              <h2 className="title">{post.title}</h2>
              {(type === "Discover" || type === "Home") && (
                <p className="creator">Creator: {post.UserId}</p>
              )}
              <p className="content">{post.content}</p>
              <p className="date">{post.postdate}</p>
              {(type === "Discover" || type === "Home") && (
                <div className="actions">
                  <button className="like" onClick={handleLikeClick}>
                    Like
                  </button>
                  <button
                    className={`follow ${followedUsers.includes(post.UserId) ? "unfollow" : ""}`}
                    onClick={(event) => handleFollowClick(event, post.UserId)}
                  >
                    {followedUsers.includes(post.UserId) ? "Unfollow" : "Follow"}
                  </button>
                </div>
              )}
              {type !== "Discover" && type !== "Home" && (
                <button
                  className="delete"
                  onClick={(event) => handleDeleteClick(event, post.id)}
                >
                  Delete
                </button>
              )}
            </div>
          );
        })}
      </div>
      <div className={`overlay ${selectedPost ? "show" : ""}`} />
    </div>
  );
}
