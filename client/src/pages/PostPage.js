// Importing necessary components, hooks, and libraries
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom"; // Components for navigation
import { formatISO9075 } from "date-fns"; // Library for date formatting
import { UserContext } from "../UserContext"; // User context for managing user information

// Component for displaying a single post
export default function PostPage() {
  // State variable to store post information
  const [postInfo, setPostInfo] = useState(null);
  // Accessing user information from the context
  const { userInfo } = useContext(UserContext);
  // Fetching the post ID from URL params
  const { id } = useParams();

  // Fetching post information from the backend when the component mounts
  useEffect(() => {
    fetch(`http://localhost:4000/post/${id}`).then((response) => {
      response.json().then((postInfo) => {
        setPostInfo(postInfo); // Updating state with fetched post information
      });
    });
  }, [id]); // Dependency array with 'id' to re-run effect when ID changes

  // If post information is not available yet, return an empty string
  if (!postInfo) return "";

  return (
    <div className="post-page">
      {/* Displaying post title */}
      <h1>{postInfo.title}</h1>
      {/* Formatting and displaying post creation date */}
      <time>{formatISO9075(new Date(postInfo.createdAt))}</time>
      {/* Displaying post author */}
      <div className="author">by @{postInfo.author.username}</div>
      {/* Displaying edit button if the current user is the author of the post */}
      {userInfo.id === postInfo.author._id && (
        <div className="edit-row">
          {/* Link to edit the current post  */}
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            {/* SVG icon for edit */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              {/* Edit icon */}
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
              />
            </svg>
            Edit this post
          </Link>
        </div>
      )}
      {/* Displaying post cover image */}
      <div className="image">
        <img src={`http://localhost:4000/${postInfo.cover}`} alt="" />
      </div>
      {/* Displaying post content with HTML formatting */}
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postInfo.content }}
      />
    </div>
  );
}
