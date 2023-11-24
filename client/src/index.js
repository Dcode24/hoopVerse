// Importing necessary dependencies
import React from "react";
import ReactDOM from "react-dom/client"; // Importing ReactDOM from the client
import App from "./App"; // Importing the main App component
import { BrowserRouter } from "react-router-dom"; // Importing BrowserRouter for routing

// Creating a root for ReactDOM to render the application
const root = ReactDOM.createRoot(document.getElementById("root"));

// Rendering the application wrapped in React StrictMode and BrowserRouter
root.render(
  <React.StrictMode>
    {/* Wrapping the entire app with BrowserRouter for routing  */}
    <BrowserRouter>
      {/* Rendering the main App component */}
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
