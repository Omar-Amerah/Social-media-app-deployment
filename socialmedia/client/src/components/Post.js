import React from "react";
import "../assets/post.css";
import GetAllPosts from "./utils/posts/GetAllPosts";
import GetUserPosts from "./utils/posts/GetUserPosts";
import DeletePost from "./utils/posts/DeletePost";
import GetOneUser from "./utils/users/GetOneUser";

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
  const [Username, setUsername] = React.useState(); 


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
      } else {
        response = await GetUserPosts(cookies());
        // Convert the single post object into an array
        response = response;
      }
      console.log("Response:", response);
      setPosts(response);
    }
    fetchData();
  }, [type]);

  function handlePostClick(post) {
    document.body.classList.add("lock-scrolling");
    setSelectedPost(post);
  }

  async function handleDeleteClick(event, id) {
    event.stopPropagation(); // Stop event propagation
    await DeletePost(id);
    window.location.reload();
  }

  function handleCloseClick() {
    document.body.classList.remove("lock-scrolling");
    setSelectedPost(null);
  }

  function handleLikeClick(event) {
    event.stopPropagation(); // Stop event propagation
    // Handle like functionality here
    console.log("Like clicked");
  }

  function handleFollowClick(event) {
    event.stopPropagation(); // Stop event propagation
    // Handle follow functionality here
    console.log("Follow clicked");
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
          {type === "Discover" && <p className="creator">Creator: {selectedPost.UserId}</p>}
          <p className="content">{selectedPost.content}</p>
          <p className="date">Date: {selectedPost.postdate}</p>
          {type === "Discover" && (
            <div className="actions">
              <button className="like" onClick={handleLikeClick}>
                Like
              </button>
              <button className="follow" onClick={handleFollowClick}>
                Follow
              </button>
            </div>
          )}
          {type !== "Discover" && (
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
              {type === "Discover" && <p className="creator">Creator: {post.UserId}</p>}
              <p className="content">{post.content}</p>
              <p className="date">{post.postdate}</p>
              {type === "Discover" && (
                <div className="actions">
                  <button className="like" onClick={handleLikeClick}>
                    Like
                  </button>
                  <button className="follow" onClick={handleFollowClick}>
                    Follow
                  </button>
                </div>
              )}
              {type !== "Discover" && (
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
