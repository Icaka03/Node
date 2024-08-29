import React, { createContext, useState } from "react";

// Create the context
export const MyContext = createContext();

// Create a provider component
export const MyProvider = ({ children }) => {
  const [username, setUsername] = useState("");

  return (
    <MyContext.Provider value={{ username, setUsername }}>
      {children}
    </MyContext.Provider>
  );
};
