// Importing necessary components and styles
import { useState } from "react";
import ReactQuill from "react-quill"; // Rich text editor component
import "react-quill/dist/quill.snow.css"; // Styles for the rich text editor
import { Navigate } from "react-router-dom"; // Redirect component for navigation
import Editor from "../Editor"; // Custom editor component

// Component for creating a new post
export default function CreatePost() {
  // State variables to store post details
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [content, setContent] = useState("");
  const [files, setFiles] = useState("");
  const [redirect, setRedirect] = useState(false);

  // Function to create a new post
  async function createNewPost(ev) {
    // Creating FormData to send data including files
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("file", files[0]); // Assuming single file upload
    ev.preventDefault();

    // Sending POST request to create a new post
    const response = await fetch("http://localhost:4000/post", {
      method: "POST",
      body: data,
      credentials: "include", // Sending credentials for authentication
    });

    // Redirecting to the home page if post creation is successful
    if (response.ok) {
      setRedirect(true);
    }
  }

  // Redirecting to the home page if post was created successfully
  if (redirect) {
    return <Navigate to={"/"} />;
  }

  // Rendering the form for creating a new post
  return (
    <form onSubmit={createNewPost}>
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
      {/* Using a rich text editor for the post content  */}
      <Editor value={content} onChange={setContent} />
      <button style={{ marginTop: "5px" }}>Create Post</button>
    </form>
  );
}
