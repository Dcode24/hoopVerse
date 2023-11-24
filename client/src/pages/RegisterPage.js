// Importing necessary hook
import { useState } from "react";

// Component for user registration
export default function RegisterPage() {
  // State variables to manage username and password
  const [username, setUsername] = useState(""); // State for username
  const [password, setPassword] = useState(""); // State for password

  // Function to handle user registration
  async function register(ev) {
    ev.preventDefault(); // Prevent default form submission

    // Sending a POST request to the backend for user registration
    const response = await fetch("http://localhost:4000/register", {
      method: "POST", // Using POST method
      body: JSON.stringify({ username, password }), // Sending username and password in the request body as JSON
      headers: { "Content-Type": "application/json" }, // Specifying content type as JSON
    });
    // Checking the response status to determine the success or failure of registration
    if (response.status === 200) {
      alert("registration successful"); // Alerting user for successful registration
    } else {
      alert("registration failed"); // Alerting user for failed registration
    }
  }
  // Rendering the registration form
  return (
    <form className="register" onSubmit={register}>
      <h1>Register</h1>
      {/* Input field for username */}
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(ev) => setUsername(ev.target.value)} // Updating username state on change
      />
      {/* Input field for password */}
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)} // Updating password state on change
      />
      {/* Button for registration submission */}
      <button>Register</button>
    </form>
  );
}
