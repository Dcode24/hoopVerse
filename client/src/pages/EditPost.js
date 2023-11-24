// Importing necessary components and hooks
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom"; // Used for navigation
import Editor from "../Editor"; // Custom editor component

// Component for editing a post
export default function EditPost() {
  const { id } = useParams(); // Fetching the post ID from URL params
  const [title, setTitle] = useState(""); // State for post title
  const [summary, setSummary] = useState(""); // State for post summary
  const [content, setContent] = useState(""); // State for post content
  const [files, setFiles] = useState(""); // State for file uploads
  const [redirect, setRedirect] = useState(false); // State for redirection after post update

  // Fetch post information using post ID when component mounts
  useEffect(() => {
    fetch("http://localhost:4000/post/" + id).then((response) => {
      response.json().then((postInfo) => {
        // Updating state with fetched post data
        setTitle(postInfo.title);
        setContent(postInfo.content);
        setSummary(postInfo.summary);
      });
    });
  }, []); // Dependency array to run effect when ID changes

  // Function to update the post
  async function updatePost(ev) {
    ev.preventDefault(); // Prevent default form submission
    const data = new FormData(); // Creating FormData object to send data
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (files?.[0]) {
      data.set("file", files?.[0]); // Adding file to FormData if present
    }
    // Sending PUT request to update the post
    const response = await fetch("http://localhost:4000/post", {
      method: "PUT",
      body: data,
      credentials: "include", // Sending credentials for authentication
    });
    // Redirecting to the updated post if successful update
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Redirecting to the updated post URL if redirect flag is true
  if (redirect) {
    return <Navigate to={"/post/" + id} />;
  }

  // Rendering the form to edit the post
  return (
    <form onSubmit={updatePost}>
      <input
        type="title"
        placeholder={"Title"}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFiles(ev.target.files)} />
      {/* Using a custom editor to edit the post content */}
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: "5px" }}>Update post</button>
    </form>
  );
}
