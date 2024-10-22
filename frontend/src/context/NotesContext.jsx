import { useState } from "react";
import { createContext } from "react";

const NotesContext = createContext();

const NotesContextProvider = ({ children }) => {
  const [notes, setNotes] = useState(null);

  const [isLoading, setIsLoading] = useState(false);
  const [isSearchFound, setIsSearchFound] = useState(null);

  return (
    <NotesContext.Provider
      value={{
        notes,
        setNotes,
        isLoading,
        setIsLoading,
        isSearchFound,
        setIsSearchFound,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

export { NotesContext, NotesContextProvider };
