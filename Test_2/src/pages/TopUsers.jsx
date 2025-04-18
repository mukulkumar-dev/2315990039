import { useEffect, useState } from "react";
import axios from "axios";
import "./TopUsers.css";

const TopUsers = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    // Fetch the top users
    axios
      .get("/api/top-users")
      .then(async (res) => {
        // Check if the response data is in the expected format
        if (res.headers["content-type"].includes("application/json")) {
          try {
            // Check if the data is an array
            if (Array.isArray(res.data)) {
              // For each user, fetch their posts
              const usersWithPosts = await Promise.all(
                res.data.map(async (user) => {
                  try {
                    // Fetch posts for each user using their userId
                    const postsResponse = await axios.get(
                      `/api/users/${user.id}/posts`
                    );
                    return {
                      ...user,
                      posts: postsResponse.data.posts, // Add posts to the user object
                    };
                  } catch (error) {
                    console.error(
                      `Error fetching posts for user ${user.id}:`,
                      error
                    );
                    return {
                      ...user,
                      posts: [], // If there's an error, return empty posts
                    };
                  }
                })
              );
              setUsers(usersWithPosts); // Set users with their posts
            } else {
              setError("Unexpected data format. Expected an array.");
            }
          } catch (e) {
            setError("Error processing the data.");
          }
        } else {
          setError("Received HTML instead of JSON. Check the API.");
        }
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
        setError("Failed to fetch users.");
      });
  }, []);

  if (error) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div className="top-users-container">
      <h2 className="top-title">🏆 Top 5 Users</h2>
      <ul className="top-user-list">
        {users.map((user, i) => (
          <li key={user.id} className="top-user-item">
            <img src={user.avatar} alt="avatar" className="top-user-avatar" />
            <div className="top-user-info">
              <strong className="top-user-name">
                {i + 1}. {user.name}
              </strong>
              <span className="top-user-posts">Posts: {user.posts.length}</span>
              <div className="top-user-post-snippet">
                {user.posts.length > 0
                  ? user.posts[0].title // Display the title of the first post
                  : "No posts available"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TopUsers;
