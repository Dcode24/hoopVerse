// Importing necessary components
import { Outlet } from "react-router-dom"; // Outlet allows nested routing
import Header from "./Header"; // Importing the Header component

// Main Layout component that structures the app layout
export default function Layout() {
  return (
    <main>
      {/* Rendering the Header component */}
      <Header />
      {/* Outlet renders the child route components */}
      <Outlet />
    </main>
  );
}
