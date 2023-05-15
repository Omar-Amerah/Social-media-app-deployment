import React from "react";
import "../assets/post.css";
import GetAllPosts from "./utils/posts/GetAllPosts";

export default function Posts() {
  const [posts, setPosts] = React.useState([]);
  const [selectedPost, setSelectedPost] = React.useState(null);

  React.useEffect(() => {
    async function fetchData() {
      const response = await GetAllPosts();
      setPosts(response);
    }

    fetchData();
  }, []);

  function handlePostClick(post) {
    setSelectedPost(post);
  }

  function handleCloseClick() {
    setSelectedPost(null);
  }

  return (
    <div>
      {selectedPost && (
        <div className={`post selected`}>
          <h2 className="title">{selectedPost.title}</h2>
          <p className="content">{selectedPost.content}</p>
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
              className="post"
              onClick={() => handlePostClick(post)}
            >
              <h2 className="title">{post.title}</h2>
              <p className="content">{post.content}</p>
            </div>
          );
        })}
      </div>
      <div className={`overlay ${selectedPost ? "show" : ""}`} />
    </div>
  );
}
