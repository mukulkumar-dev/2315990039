import { useEffect, useState } from "react";
import axios from "axios";
import PostCard from "../components/PostCard";

const TrendingPosts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/api/trending-posts")
      .then((res) => setPosts(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2 className="mb-4">🔥 Trending Posts</h2>
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default TrendingPosts;
