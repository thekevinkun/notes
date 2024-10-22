import { useEffect, useState } from "react";
import { createContext } from "react";

const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userLoggedIn = JSON.parse(localStorage.getItem("user"));

    if (userLoggedIn) setUser(userLoggedIn);
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading, setIsLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };
