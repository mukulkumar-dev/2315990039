import React, { useState, useEffect } from "react";
import "./PostCard.css";

const PostCard = ({ userId }) => {
  const [user, setUser] = useState(null); // Only state for user data

  useEffect(() => {
    // Fetch user data from the backend
    const fetchUserData = async () => {
      try {
        // Fetch user data based on the userId prop
        const userResponse = await fetch(
          `http://localhost:5000/users/${userId}`
        );

        if (!userResponse.ok) {
          throw new Error("User not found");
        }

        const userData = await userResponse.json();
        setUser(userData); // Set the user data to the state
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [userId]); // Run effect when userId changes

  // If user data is still loading
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="post-card-horizontal">
      <img
        src={user.avatar || "http://example.com/default-avatar.jpg"} // Fallback avatar image
        alt="user"
        className="avatar-horizontal"
      />

      <div className="post-content-section">
        <div className="post-header-horizontal">
          <h6 className="username">{user.name || "Unknown User"}</h6>
          <small className="timestamp">
            {/* No timestamp since it's not needed for user data */}
          </small>
        </div>

        <p className="post-content">{user.email || "No email available"}</p>

        {/* You can add any other user-related data if needed */}
      </div>
    </div>
  );
};

export default PostCard;
