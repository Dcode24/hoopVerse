// Importing necessary functions/components
import { createContext, useState } from "react";

// Creating a context to manage user information
export const UserContext = createContext({});

// Context provider component for managing user information
export function UserContextProvider({ children }) {
  // State to hold user information using useState hook
  const [userInfo, setUserInfo] = useState({});

  // Rendering the UserContext.Provider to provide user information to its children
  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {children} {/* Render the children components */}
    </UserContext.Provider>
  );
}
