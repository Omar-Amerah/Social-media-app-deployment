import React from "react";
import "../assets/post.css";
import GetAllPosts from "./utils/posts/GetAllPosts";
import GetUserPosts from "./utils/posts/GetUserPosts";
import DeletePost from "./utils/posts/DeletePost";
import GetOneUser from "./utils/users/GetOneUser";
import FollowUser from "./utils/users/FollowUser";
import FollowedPosts from "./utils/posts/FollowedPosts";
import LikePost from "./utils/users/LikePost";
import EditPostBox from "./Editpost";

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
  const [showEditPost, setShowEditPost] = React.useState(false);
  const [selectedPost, setSelectedPost] = React.useState(null);
  const [followedUsers, setFollowedUsers] = React.useState([]);
  const [postUsernames, setPostUsernames] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      let response;
      if (type === "Discover") {
        response = await GetAllPosts();
        const followedUsers = (await GetOneUser(cookies())).followed;
        setFollowedUsers(followedUsers);
        const postUsernames = (await GetOneUser(cookies())).username;
        setPostUsernames(postUsernames);
      } else if (type === "Home") {
        console.log(cookies())
        const userId = cookies(); // Retrieve the user ID from cookies
        response = await FollowedPosts(userId);
        const followedUsers = (await GetOneUser(cookies())).followed;
        setFollowedUsers(followedUsers);
        const postUsernames = (await GetOneUser(cookies())).username;
        setPostUsernames(postUsernames);
      } else {
        response = await GetUserPosts(cookies());
      }
      setPosts(response);
    }
    fetchData();
  }, [type]);

  async function fetchUsername(userId) {
    const user = await GetOneUser(userId);
    return user.username;
  }

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

  async function handleEditClick(event) {
    event.stopPropagation();
    setShowEditPost(true);
    document.body.classList.add("overlay-active");
  }

  const handleCloseEditPost = () => {
    setShowEditPost(false);
    document.body.classList.remove("overlay-active");
  };

  function handleCloseClick() {
    document.body.classList.remove("lock-scrolling");
    setSelectedPost(null);
  }

  async function handleLikeClick(event, PostId) {
    event.stopPropagation();
    await LikePost(cookies(), PostId);
    window.location.reload();
  }

  async function handleFollowClick(event, UserId) {
    event.stopPropagation();
    await FollowUser(UserId, cookies());
    const updatedFollowedUsers = (await GetOneUser(cookies())).followed;
    setFollowedUsers(updatedFollowedUsers);
  }

  if (!posts || posts.length === 0) {
    return null;
  }

  return (
    <div>
      {selectedPost && (
        <div className={`post selected`}>
          <h2 className="title">{selectedPost.title}</h2>
          {(type === "Discover" || type === "Home") && (
            <React.Fragment>
              <p className="creator">
                Creator:{postUsernames}
              </p>
              <p className="creator">Likes: {selectedPost.likes}</p>
            </React.Fragment>
          )}
          <p className="content">{selectedPost.content}</p>
          <p className="date">Date: {selectedPost.postdate}</p>
          {(type === "Discover" || type === "Home") && (
            <div className="actions">
              <button
                className="like"
                onClick={(event) => handleLikeClick(event, selectedPost.id)}
              >
                Like
              </button>
              <button
                className={`follow ${
                  followedUsers.includes(selectedPost.UserId) ? "unfollow" : ""
                }`}
                onClick={(event) => handleFollowClick(event, selectedPost.UserId)}
              >
                {followedUsers.includes(selectedPost.UserId) ? "Unfollow" : "Follow"}
              </button>
            </div>
          )}
          {type !== "Discover" && type !== "Home" && (
            <React.Fragment>
              <button
                className="delete"
                onClick={(event) => handleDeleteClick(event, selectedPost.id)}
              >
                Delete
              </button>
              <button
                className="edit"
                onClick={(event) => handleEditClick(event, selectedPost.id)}
              >
                Edit
              </button>
              {showEditPost && (
                <>
                  <EditPostBox onClose={handleCloseEditPost} />
                  <div className="overlay" />
                </>
              )}
            </React.Fragment>
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
                <React.Fragment>
                  <p className="creator">
                    Creator:{postUsernames}
                  </p>
                  <p className="creator">Likes: {post.likes}</p>
                </React.Fragment>
              )}
              <p className="content">{post.content}</p>
              <p className="date">{post.postdate}</p>
              {(type === "Discover" || type === "Home") && (
                <div className="actions">
                  {/* <button className="like" onClick={(event) => handleLikeClick(event, selectedPost.id)}>
                    Like
                  </button> */}
                  <button
                    className={`follow ${
                      followedUsers.includes(post.UserId) ? "unfollow" : ""
                    }`}
                    onClick={(event) => handleFollowClick(event, post.UserId)}
                  >
                    {followedUsers.includes(post.UserId) ? "Unfollow" : "Follow"}
                  </button>
                </div>
              )}
              {type !== "Discover" && type !== "Home" && (
                <React.Fragment>
                  <button
                    className="delete"
                    onClick={(event) => handleDeleteClick(event, post.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="edit"
                    onClick={(event) => handleEditClick(event, post.id)}
                  >
                    Edit
                  </button>
                  {showEditPost && (
                    <>
                      <EditPostBox onClose={handleCloseEditPost} />
                      <div className="overlay" />
                    </>
                  )}
                </React.Fragment>
              )}
            </div>
          );
        })}
      </div>
      <div className={`overlay ${selectedPost ? "show" : ""}`} />
    </div>
  );
}
