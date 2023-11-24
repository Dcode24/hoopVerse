// Importing necessary hooks and components
import { useEffect, useState } from "react";
import Post from "../Post"; // Imported Post component

// Component for the homepage displaying posts
export default function HomePage() {
  const [posts, setPosts] = useState([]); // State to store fetched posts

  // Fetching posts from the backend when the component mounts
  useEffect(() => {
    fetch("http://localhost:4000/post").then((response) => {
      response.json().then((posts) => {
        setPosts(posts); // Updating the state with fetched posts
      });
    });
  }, []); // Empty dependency array to run effect only on mount

  // Rendering fetched posts using the Post component
  return (
    <>
      {/* Conditionally rendering posts if there are any */}
      {posts.length > 0 && posts.map((post) => <Post {...post} />)}
    </>
  );
}
