// Importing necessary components and hooks
import { useContext, useState } from "react";
import { Navigate } from "react-router-dom"; // Component for navigation
import { UserContext } from "../UserContext"; // User context for managing user information

// Component for the login page
export default function LoginPage() {
  // State variables to manage username, password, and redirection
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password
  const [redirect, setRedirect] = useState(false); // State for redirection
  const { setUserInfo } = useContext(UserContext); // Accessing user context for user information

  // Function to handle user login
  async function login(ev) {
    ev.preventDefault(); // Prevent default form submission
    // Sending a POST request to the backend for user login
    const response = await fetch("http://localhost:4000/login", {
      method: "POST",
      body: JSON.stringify({ username, password }), // Sending username and password in the request body
      headers: { "Content-Type": "application/json" }, // Specifying content type as JSON
      credentials: "include", // Sending credentials for authentication
    });
    // If login is successful (response.ok), update user information and set redirection flag
    if (response.ok) {
      response.json().then((userInfo) => {
        setUserInfo(userInfo); // Update user information in the context
        setRedirect(true); // Set redirection flag to true
      });
      setRedirect(true);
    } else {
      // If login fails, display an alert for wrong credentials
      alert("wrong credentials");
    }
  }

  // Redirect to the home page if redirection flag is true
  if (redirect) {
    return <Navigate to={"/"} />; // Navigate component for redirecting
  }
  // Rendering the login form
  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button>Login</button>
    </form>
  );
}
