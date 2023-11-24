import { useContext, useEffect, useImperativeHandle, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header() {
  // Accessing user information from the UserContext
  const { setUserInfo, userInfo } = useContext(UserContext);

  // Fetching user profile data when the component mounts
  useEffect(() => {
    // Fetching user profile information from the server
    fetch("http://localhost:4000/profile", {
      credentials: "include", // Sending credentials for authentication
    }).then((response) => {
      // Parsing the response as JSON and updating userInfo using setUserInfo
      response.json().then((userInfo) => {
        setUserInfo(userInfo);
      });
    });
  }, []); // Running this effect only once on component mount

  // Function to handle user logout
  function logout() {
    // Making a POST request to the server to log the user out
    fetch("http://localhost:4000/logout", {
      credentials: "include", // Sending credentials for authentication
      method: "POST", // Using POST method for logout
    });
    setUserInfo(null); // Clearing user information in the context after logout
  }

  // Extracting the username from userInfo, using optional chaining to avoid errors
  const username = userInfo?.username;

  return (
    <header>
      {/* Logo linking to the home page */}
      <Link to="/" className="logo">
        hoopVerse
      </Link>
      {/* Navigation section */}
      <nav>
        {/* If the user is logged in */}
        {username && (
          <>
            {/* Displaying the username */}
            <span>Hello, {username}</span>
            {/* Link to create a new post */}
            <Link to="/create">Create new post</Link>
            {/* Logout link */}
            <a onClick={logout}>Logout</a>
          </>
        )}
        {/* If the user is not logged in */}
        {!username && (
          <>
            {/* Link to the login page */}
            <Link to="/login">Login</Link>
            {/* Link to the registration page */}
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}
