import React, { useEffect, useState } from "react";
import axios from "axios";
import "./TrendingPosts.css";

export default function TrendingPosts({ userId }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!userId) {
      setError("User ID is required.");
      setLoading(false);
      return;
    }

    axios
      .get(`http://localhost:5000/users/${userId}/posts`) // ✅ string interpolation fixed
      .then((res) => {
        setPosts(res.data.posts);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch posts");
        setLoading(false);
      });
  }, [userId]);

  return (
    <div className="trending-container">
      <h1 className="trending-title">🔥 Trending Posts</h1>

      {loading && <p className="loading-text">Loading...</p>}
      {error && <p className="error-text">{error}</p>}

      {!loading && !error && posts.length === 0 && (
        <p className="no-posts">No trending posts available.</p>
      )}

      {!loading && !error && posts.length > 0 && (
        <ul className="post-list">
          {posts.map((post) => (
            <li key={post.id} className="post-item">
              <p className="post-title">{post.title}</p>
              <p className="post-body">{post.body}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
