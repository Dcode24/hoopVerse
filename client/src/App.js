// Importing necessary components and styles
import Post from "./Post";
import "./App.css";
import Header from "./Header";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContext, UserContextProvider } from "./UserContext"; // Importing user context and provider
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";

// The main App component
function App() {
  return (
    // Wrapping the entire application with the UserContextProvider to provide user data throughout the app
    <UserContextProvider>
      {/* Using React Router's Routes component for defining different routes */}
      <Routes>
        {/* Defining the default layout for all routes */}
        <Route path="/" element={<Layout />}>
          {/* Route for the homepage */}
          <Route index element={<HomePage />} />
          {/* Route for the login page */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route for the registration page */}
          <Route path="/register" element={<RegisterPage />} />
          {/* Route for creating a new post */}
          <Route path="/create" element={<CreatePost />} />
          {/* Route for displaying a single post based on its ID */}
          <Route path="/post/:id" element={<PostPage />} />
          {/* Route for editing a post based on its ID */}
          <Route path="/edit/:id" element={<EditPost />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

// Exporting the App component as the default export
export default App;
